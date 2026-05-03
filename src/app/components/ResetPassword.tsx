import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { authAPI } from "../utils/api";
import logo from "../../assets/logo.png";

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token. Please request a new reset link.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await authAPI.resetPassword({ token, password: formData.password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600 text-base sm:text-lg">Choose a strong new password</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 border-2 border-amber-200">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Password Reset!</h3>
              <p className="text-gray-600 mb-1">Your password has been updated successfully.</p>
              <p className="text-sm text-gray-500">Redirecting you to Sign In...</p>
            </motion.div>
          ) : (
            <>
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

              {!token && (
                <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl">
                  <p className="text-amber-700 text-sm font-medium">
                    No reset token found. Please use the link from your email or{" "}
                    <Link to="/forgot-password" className="underline font-bold">
                      request a new one
                    </Link>
                    .
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                    New Password
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
                    Confirm New Password
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
                  disabled={loading || !token}
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-gray-500 hover:text-gray-700 text-sm">
                  ← Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}