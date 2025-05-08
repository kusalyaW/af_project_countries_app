// client/src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 mt-auto">
      <p className="text-sm">&copy; {new Date().getFullYear()} Countries App. Data from REST Countries.</p>
    </footer>
  );
}
