// client/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { login as loginUser } from '../api/auth';
import { AuthContext }     from '../context/AuthContext';
import { useNavigate }     from 'react-router-dom';
import { MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login } = useContext(AuthContext);
  const navigate  = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(email, password);
      login(res.data);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
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
          Sign In
        </h2>

        {error && (
          <div className="text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 p-2 rounded">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="relative">
          <MailIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <LockClosedIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          >
            {showPwd
              ? <EyeOffIcon className="w-5 h-5" />
              : <EyeIcon    className="w-5 h-5" />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full flex items-center justify-center py-2 rounded
            bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition
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
          {loading ? 'Signing In…' : 'Sign In'}
        </button>

        {/* Extra Links */}
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
