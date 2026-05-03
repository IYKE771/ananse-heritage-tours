# Ananse Heritage Tours - Local Server

## Overview
This is a local Node.js/Express server that manages client data, bookings, and messages for the Ananse Heritage Tours website. All data is stored locally on your machine in JSON files.

## Features
- ✅ User Authentication (Signup/Login with JWT)
- ✅ Booking Management
- ✅ Real-time Chat/Messaging with Socket.IO
- ✅ Client Dashboard
- ✅ Admin Dashboard to manage all data
- ✅ Local Data Storage (no cloud required)

## Installation

### 1. Navigate to the server directory:
```bash
cd server
```

### 2. Install dependencies:
```bash
npm install
```

## Running the Server

### Start the server:
```bash
npm start
```

### Or use development mode with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## Data Storage

All data is stored locally in the `/server/data` directory as JSON files:
- `users.json` - User accounts and profiles
- `bookings.json` - Tour bookings
- `messages.json` - Chat messages between clients and admin

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `PATCH /api/bookings/:id` - Update booking status

### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages` - Get user's messages
- `PATCH /api/messages/:id/read` - Mark message as read

### Admin (requires admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/messages` - Get all messages

## Admin Access

To create an admin account, after starting the server:

1. Register a normal user through the website
2. Stop the server
3. Open `/server/data/users.json`
4. Find your user and change `"role": "client"` to `"role": "admin"`
5. Restart the server
6. Login with your account - you'll now have admin access

## Security Notes

- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt
- This is designed for LOCAL use only - not for production deployment
- Do not expose this server to the internet without proper security measures

## Troubleshooting

### Port already in use:
If port 3001 is already in use, you can change it in `server.js`:
```javascript
const PORT = 3001; // Change to any available port
```

### Data directory not created:
The server automatically creates the `/server/data` directory and initializes empty JSON files on first run.

## Default Admin Credentials

After first run, you can manually create an admin user by:
1. Registering through the website
2. Editing `/server/data/users.json`
3. Changing the user's role to "admin"

## Socket.IO (Real-time Chat)

The server uses Socket.IO for real-time messaging. Messages are automatically pushed to connected clients without needing to refresh.

## Backup Your Data

Important: Regularly backup the `/server/data` directory to prevent data loss!

```bash
# Example backup command
cp -r server/data server/data-backup-$(date +%Y%m%d)
```

## Support

For questions or issues, please contact the development team.
