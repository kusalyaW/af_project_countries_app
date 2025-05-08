// client/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">🌎 Countries</Link>
        <nav className="space-x-4">
          <Link to="/app" className="hover:underline">Home</Link>
          <Link to="/favorites" className="hover:underline">Favorites</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </nav>
      </div>
    </header>
  );
}
