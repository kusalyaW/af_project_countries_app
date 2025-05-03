import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-600 p-4 flex justify-between">
      <Link to="/" className="font-bold text-white">Countries</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/favorites" className="text-white hover:text-gray-200">Favorites</Link>
            <button
              onClick={logout}
              className="text-white hover:text-gray-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-gray-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-gray-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
