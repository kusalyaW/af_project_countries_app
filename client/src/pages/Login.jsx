import React, { useState, useContext } from 'react';
import { login as loginUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
        
      const res = await fetch('https://af-project-countries-app.onrender.com/api/auth/login',{
        method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data)
      console.log('awa')
      login(data);
      console.log(res);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
    </form>
  );
};

export default Login;
