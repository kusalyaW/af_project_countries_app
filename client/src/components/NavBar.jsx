import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [dark, setDark] = useState(() => localStorage.theme === 'dark');
  const [mobileOpen, setMobileOpen] = useState(false);

  // sync dark mode with localStorage and html class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark(prev => !prev);
  const toggleMobile = () => setMobileOpen(prev => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200">
          CountriesApp
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/app" className="text-white hover:text-gray-200 transition">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/favorites" className="text-white hover:text-gray-200 transition">
                Favorites
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200 transition">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200 transition">
                Register
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMobile}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`${mobileOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800`}>  
        <div className="px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/favorites"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
              >
                Favorites
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
