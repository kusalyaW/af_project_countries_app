// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  HomeIcon,
  InformationCircleIcon,
  CodeBracketSquareIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8">
      {/* Full-width wrapper */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Branding / Attribution */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-semibold">🌍 Countries App</p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()}. Data from{' '}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              REST Countries
            </a>.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <nav className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
            <HomeIcon className="w-5 h-5 mr-1" /> Home
          </Link>
          <Link to="/favorites" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
            <HeartIcon className="w-5 h-5 mr-1" /> Favorites
          </Link>
          <Link to="/about" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
            <InformationCircleIcon className="w-5 h-5 mr-1" /> About
          </Link>
        </nav>

        {/* Contact & Social */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 items-center">
          {/* Contact info */}
          <div className="text-sm mb-4 sm:mb-0">
            <p>📧 <a href="mailto:support@countriesapp.com" className="underline hover:text-blue-600">support@countriesapp.com</a></p>
            <p>📞 +1 (555) 123-4567</p>
          </div>
          {/* Code & Tweet */}
          <div className="flex space-x-4">
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
              className="hover:text-blue-500"
              aria-label="Tweet"
            >
              <ChatBubbleLeftIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <div className="mt-6 text-center">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <ArrowUpIcon className="w-5 h-5 mr-1" />
          Back to top
        </button>
      </div>
    </footer>
  );
}
