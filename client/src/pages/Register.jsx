// client/src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { register as registerUser } from '../api/auth';
import { AuthContext }            from '../context/AuthContext';
import { useNavigate, Link }      from 'react-router-dom';
import { UserIcon,EnvelopeIcon,LockClosedIcon,EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Register() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [password,setPassword]= useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate     = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(name, email, password);
      register(res.data);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Create Account
        </h2>

        {error && (
          <div className="text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 p-2 rounded">
            {error}
          </div>
        )}

        
        <div className="relative">
          <UserIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={e => setName(e.target.value)}
  className="
    w-full pl-10 pr-3 py-2 border rounded
    text-gray-900 placeholder-gray-500
    dark:text-gray-100 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-400
    dark:bg-gray-700 dark:border-gray-600
  "
/>

        </div>

        
        <div className="relative">
          <EnvelopeIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="
            w-full pl-10 pr-3 py-2 border rounded
            text-gray-900 placeholder-gray-500
            dark:text-gray-100 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-400
            dark:bg-gray-700 dark:border-gray-600
          "          />
        </div>

        
        <div className="relative">
          <LockClosedIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="
            w-full pl-10 pr-10 py-2 border rounded
            text-gray-900 placeholder-gray-500
            dark:text-gray-100 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-400
            dark:bg-gray-700 dark:border-gray-600
          "          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          >
            {showPwd
              ? <EyeSlashIcon className="w-5 h-5" />
              : <EyeIcon      className="w-5 h-5" />}
          </button>
        </div>

       
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full flex items-center justify-center py-2 rounded
            bg-green-600 text-white font-semibold
            hover:bg-green-700 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {loading
            ? <svg
                className="w-5 h-5 animate-spin mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            : null}
          {loading ? 'Signing Up…' : 'Sign Up'}
        </button>

        {/* Already have an account */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
