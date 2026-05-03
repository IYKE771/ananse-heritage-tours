import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Menu, X, MapPin, Phone, Mail, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/logo.png";
import { getToken, removeToken } from "../utils/api";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [location]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Attractions", href: "/attractions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Plan Your Visit", href: "/plan-visit" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <motion.header
        className="bg-white/98 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b-3 border-yellow-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/" className="flex items-center space-x-4 group">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <img src={logo} alt="Ananse Heritage Tours" className="h-16" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:space-x-8 items-center">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.12 }}
                >
                  <Link
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-3 transition-all duration-500 relative group text-lg font-semibold ${
                      isActive(item.href)
                        ? "border-yellow-500 text-amber-700"
                        : "border-transparent text-gray-700 hover:text-amber-600"
                    }`}
                  >
                    {item.name}
                    <span className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-yellow-500 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
                  </Link>
                </motion.div>
              ))}

              {/* Auth Buttons - Desktop */}
              <motion.div
                className="flex items-center space-x-3 ml-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold text-amber-700 border-2 border-amber-500 rounded-lg hover:bg-amber-50 transition-all duration-300"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold text-amber-700 border-2 border-amber-500 rounded-lg hover:bg-amber-50 transition-all duration-300"
                    >
                      <User className="h-4 w-4" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-amber-600 hover:bg-amber-100 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: 0, opacity: 0 }}
                      animate={{ rotate: 90, opacity: 1 }}
                      exit={{ rotate: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <X className="block h-7 w-7" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Menu className="block h-7 w-7" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-amber-200 bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-1 pb-4 pt-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block border-l-4 py-3 pl-4 pr-4 transition-all duration-300 text-lg font-semibold ${
                        isActive(item.href)
                          ? "border-yellow-500 bg-amber-50 text-amber-700"
                          : "border-transparent text-gray-700 hover:border-yellow-400 hover:bg-amber-50 hover:text-amber-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Auth Links - Mobile */}
                <motion.div
                  className="px-4 pt-3 pb-1 flex flex-col space-y-2 border-t border-amber-100 mt-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-3 pl-4 text-lg font-semibold text-amber-700 border-l-4 border-amber-500 bg-amber-50"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                        className="flex items-center gap-2 py-3 pl-4 text-lg font-semibold text-white bg-red-500 rounded-lg"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-3 pl-4 text-lg font-semibold text-amber-700 border-l-4 border-amber-500"
                      >
                        <User className="h-5 w-5" />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 text-lg font-semibold text-white bg-amber-600 rounded-lg text-center hover:bg-amber-700 transition-colors duration-300"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden border-t-4 border-yellow-500">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="mb-6">
                <img src={logo} alt="Ananse Heritage Tours" className="h-24" />
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Where Stories Come Alive. Experience the rich tapestry of Ghana's heritage, culture and natural wonders.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="font-bold text-xl mb-6 text-yellow-400">Quick Links</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center group text-lg">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:w-3 transition-all duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <h3 className="font-bold text-xl mb-6 text-yellow-400">Contact Us - 24/7</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 group cursor-pointer">
                  <Phone className="h-5 w-5 text-yellow-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors text-lg">+233200290770/+233557482133</span>
                </li>
                <li className="flex items-center space-x-3 group cursor-pointer">
                  <Mail className="h-5 w-5 text-yellow-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors text-lg">ananseheritagetours@gmail.com</span>
                </li>
                <li className="flex items-center space-x-3 group cursor-pointer">
                  <MapPin className="h-5 w-5 text-yellow-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors text-lg">Accra, Ghana</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <p className="text-lg">&copy; 2026 Ananse Heritage Tours. All rights reserved. 🇬🇭</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
