import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, Mail, Lock, Phone, ArrowRight, AlertCircle } from "lucide-react";
import { authAPI, setToken } from "../utils/api";
import logo from "../../assets/logo.png";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center py-12 px-3 sm:px-4">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Ananse Heritage Tours" className="h-24 sm:h-32 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600 text-base sm:text-lg">Join us for an unforgettable journey</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 border-2 border-amber-200">
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="+233 XXX XXX XXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-600 hover:text-amber-700 font-bold">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}