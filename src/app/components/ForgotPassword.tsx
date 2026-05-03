import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { authAPI } from "../utils/api";
import logo from "../../assets/logo.png";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
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
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-600 text-base sm:text-lg">
            No worries — we'll send you a reset link
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 border-2 border-amber-200">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check your inbox</h3>
                <p className="text-gray-600 mb-2">
                  We sent a password reset link to
                </p>
                <p className="text-amber-600 font-bold mb-6">{email}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive it? Check your spam folder or{" "}
                  <button
                    onClick={() => setSent(false)}
                    className="text-amber-600 hover:text-amber-700 font-bold underline"
                  >
                    try again
                  </button>
                  .
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Sign In
                </Link>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Enter the email you registered with and we'll send a reset link.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}