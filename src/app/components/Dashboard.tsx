import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { User, Calendar, MessageSquare, LogOut, Home, BookOpen } from "lucide-react";
import { authAPI, bookingAPI, messageAPI, removeToken } from "../utils/api";
import logo from "../../assets/logo.png";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface Booking {
  id: string;
  tourPackage: string;
  tourDate: string;
  numberOfPeople: number;
  status: string;
  createdAt: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'messages'>('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      
      const bookingsData = await bookingAPI.getUserBookings();
      setBookings(bookingsData);
      
      const messagesData = await messageAPI.getUserMessages();
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to load data:', error);
      // If token is invalid, redirect to login
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await messageAPI.sendMessage({ content: newMessage });
      setNewMessage("");
      loadData(); // Reload messages
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <img src={logo} alt="Loading" className="h-32 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 text-xl">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-2 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Ananse Heritage Tours" className="h-16" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-700 font-medium"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl transition-colors text-red-700 font-medium"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            My Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages ({messages.filter(m => !m.read && m.senderId !== user?.id).length})
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-amber-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-600">Full Name</label>
                  <p className="text-xl text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">Email</label>
                  <p className="text-xl text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">Phone</label>
                  <p className="text-xl text-gray-900">{user?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">Account Type</label>
                  <p className="text-xl text-gray-900 capitalize">{user?.role}</p>
                </div>
              </div>
              <Link
                to="/plan-visit"
                className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-xl font-bold shadow-lg"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Book a New Tour
              </Link>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-amber-200">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
                  <Link
                    to="/plan-visit"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold"
                  >
                    Book Your First Tour
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{booking.tourPackage}</h3>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Date:</span> {new Date(booking.tourDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">People:</span> {booking.numberOfPeople}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Booked:</span> {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Messages</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No messages yet</p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-xl ${
                        message.senderId === user?.id
                          ? 'bg-amber-100 ml-8'
                          : 'bg-gray-100 mr-8'
                      }`}
                    >
                      <p className="text-gray-900">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-xl font-bold"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
