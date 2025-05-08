// components/Sidebar.jsx
import React from 'react';

export default function Sidebar({ open, onToggle, children }) {
  return (
    <div
      className={`
        fixed inset-y-0 left-0 w-64 h-screen bg-white dark:bg-gray-800      
        text-gray-900 dark:text-gray-100
        bg-white shadow-lg
        transform transition-transform duration-300 z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:shadow-none
      `}
      style={{ overflow: 'hidden' }} /* ensure no scroll */
    >
      <button
        className="absolute top-2 right-2 p-2 lg:hidden"
        onClick={onToggle}
      >
        ✕
      </button>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
