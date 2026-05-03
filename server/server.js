const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;
const JWT_SECRET = 'ananse-heritage-tours-secret-key-2026';
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
  
  // Initialize data files if they don't exist
  const files = ['users.json', 'bookings.json', 'messages.json'];
  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify([]));
    }
  }
}

// Helper functions to read/write data
async function readData(filename) {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeData(filename, data) {
  await fs.writeFile(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2)
  );
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// AUTH ENDPOINTS

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const users = await readData('users.json');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      role: 'client'
    };

    users.push(newUser);
    await writeData('users.json', users);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await readData('users.json');
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const users = await readData('users.json');
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// BOOKING ENDPOINTS

// Create new booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { tourPackage, tourDate, numberOfPeople, specialRequests } = req.body;

    if (!tourPackage || !tourDate || !numberOfPeople) {
      return res.status(400).json({ error: 'Tour package, date, and number of people are required' });
    }

    const bookings = await readData('bookings.json');
    const newBooking = {
      id: Date.now().toString(),
      userId: req.user.id,
      tourPackage,
      tourDate,
      numberOfPeople,
      specialRequests: specialRequests || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    await writeData('bookings.json', bookings);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Server error during booking' });
  }
});

// Get user's bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await readData('bookings.json');
    const userBookings = bookings.filter(b => b.userId === req.user.id);
    res.json(userBookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all bookings (admin only)
app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const bookings = await readData('bookings.json');
    const users = await readData('users.json');
    
    // Enrich bookings with user info
    const enrichedBookings = bookings.map(booking => {
      const user = users.find(u => u.id === booking.userId);
      return {
        ...booking,
        userName: user ? user.name : 'Unknown',
        userEmail: user ? user.email : 'Unknown',
        userPhone: user ? user.phone : ''
      };
    });
    
    res.json(enrichedBookings);
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update booking status (admin only)
app.patch('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    const bookings = await readData('bookings.json');
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns this booking or is admin
    if (bookings[bookingIndex].userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    bookings[bookingIndex].status = status;
    bookings[bookingIndex].updatedAt = new Date().toISOString();

    await writeData('bookings.json', bookings);
    res.json(bookings[bookingIndex]);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// MESSAGE ENDPOINTS

// Get user's messages
app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await readData('messages.json');
    const userMessages = messages.filter(
      m => m.senderId === req.user.id || m.receiverId === req.user.id
    );
    res.json(userMessages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all messages (admin only)
app.get('/api/admin/messages', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const messages = await readData('messages.json');
    const users = await readData('users.json');
    
    // Group messages by user
    const messagesByUser = {};
    messages.forEach(msg => {
      const userId = msg.senderId === 'admin' ? msg.receiverId : msg.senderId;
      if (!messagesByUser[userId]) {
        const user = users.find(u => u.id === userId);
        messagesByUser[userId] = {
          userId,
          userName: user ? user.name : 'Unknown',
          userEmail: user ? user.email : 'Unknown',
          messages: []
        };
      }
      messagesByUser[userId].messages.push(msg);
    });
    
    res.json(Object.values(messagesByUser));
  } catch (error) {
    console.error('Get all messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message
app.post('/api/messages', authenticateToken, async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const messages = await readData('messages.json');
    const newMessage = {
      id: Date.now().toString(),
      senderId: req.user.id,
      receiverId: receiverId || 'admin',
      content,
      read: false,
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    await writeData('messages.json', messages);

    // Emit socket event
    io.emit('newMessage', newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark message as read
app.patch('/api/messages/:id/read', authenticateToken, async (req, res) => {
  try {
    const messages = await readData('messages.json');
    const messageIndex = messages.findIndex(m => m.id === req.params.id);

    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    messages[messageIndex].read = true;
    await writeData('messages.json', messages);

    res.json(messages[messageIndex]);
  } catch (error) {
    console.error('Mark message read error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ADMIN ENDPOINTS

// Get all users (admin only)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const users = await readData('users.json');
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('sendMessage', async (data) => {
    try {
      const messages = await readData('messages.json');
      messages.push(data);
      await writeData('messages.json', messages);
      io.emit('newMessage', data);
    } catch (error) {
      console.error('Socket message error:', error);
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ananse Heritage Tours API is running' });
});

// Initialize and start server
async function startServer() {
  await ensureDataDir();
  server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║   ANANSE HERITAGE TOURS - LOCAL SERVER RUNNING    ║
╠════════════════════════════════════════════════════╣
║  Server:  http://localhost:${PORT}                   ║
║  Status:  ✓ Ready to accept connections           ║
║  Data:    Stored locally in /server/data          ║
╠════════════════════════════════════════════════════╣
║  API Endpoints:                                    ║
║  • POST /api/auth/register    - Register user     ║
║  • POST /api/auth/login       - Login user        ║
║  • GET  /api/auth/me          - Get current user  ║
║  • POST /api/bookings         - Create booking    ║
║  • GET  /api/bookings         - Get user bookings ║
║  • POST /api/messages         - Send message      ║
║  • GET  /api/messages         - Get messages      ║
║  • GET  /api/admin/bookings   - Get all bookings  ║
║  • GET  /api/admin/messages   - Get all messages  ║
║  • GET  /api/admin/users      - Get all users     ║
╚════════════════════════════════════════════════════╝
    `);
  });
}

startServer();
