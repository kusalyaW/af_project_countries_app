// client/src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpIcon,
  HomeIcon,
  HeartIcon,
  InformationCircleIcon,
  CodeBracketSquareIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const onSubscribe = e => {
    e.preventDefault();
    if (email) {
      // you’d hook this up to your real newsletter API…
      setSignedUp(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-blue-900 dark:bg-teal-900 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold mb-2">🌍 Countries App</h3>
          <p className="text-sm mb-4">
            Your go-to place for exploring data on every nation. Built with React + REST Countries.
          </p>
          <div className="flex space-x-3">
            <a
              href="https://github.com/kusalyaW/af_project_countries_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              <CodeBracketSquareIcon className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Check+out+this+Countries+App!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tweet"
              className="hover:text-blue-500"
            >
              <ChatBubbleLeftIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-blue-600 flex items-center">
                <HomeIcon className="w-5 h-5 mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-blue-600 flex items-center">
                <HeartIcon className="w-5 h-5 mr-1" /> Favorites
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600 flex items-center">
                <InformationCircleIcon className="w-5 h-5 mr-1" /> About
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li>
              <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                REST Countries API
              </a>
            </li>
            <li>
              <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                React Docs
              </a>
            </li>
            <li>
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                Vite
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Contact & Newsletter</h4>
          <div className="flex items-center mb-2">
            <EnvelopeIcon className="w-5 h-5 mr-1" />
            <a href="mailto:support@countriesapp.com" className="hover:text-blue-600">
              support@countriesapp.com
            </a>
          </div>
          <div className="flex items-center mb-4">
            <PhoneIcon className="w-5 h-5 mr-1" />
            <span>+1 (555) 123-4567</span>
          </div>
          {signedUp ? (
            <p className="text-green-600 dark:text-green-400">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={onSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 border rounded-l dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Back to Top */}
      <div className="mt-8 text-center">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded transition text-white"
        >
          <ArrowUpIcon className="w-5 h-5 mr-2" />
          Back to top
        </button>
      </div>
    </footer>
  );
}
