import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL;
export const register = (name, email, password) =>
    axios.post(`${API}/api/auth/register`, { name,email,password });

export const login = (email, password) =>
   axios.post(`/api/auth/login`,    { email,password });
