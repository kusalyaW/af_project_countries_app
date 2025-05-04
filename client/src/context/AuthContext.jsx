import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('user');
        if (!raw || raw === 'undefined') {
          // nothing stored yet, or accidentally wrote "undefined"
          localStorage.removeItem('user');
          return null;
        }
        try {
          return JSON.parse(raw);
        } catch {
          // malformed JSON—clean up and fall back
          localStorage.removeItem('user');
          return null;
        }
      });
      
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (data) => {
    setUser(data.user);
    console.log(user)
    setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  const register = (data) => login(data);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
