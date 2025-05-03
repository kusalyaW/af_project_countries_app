import axios from 'axios';

export const register = (name, email, password) =>
  axios.post('/api/auth/register', { name, email, password });

export const login = (email, password) =>
  axios.post('/api/auth/login', { email, password });
