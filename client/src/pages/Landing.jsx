// client/src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-[url('/hero-map.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-lg">
            <h1 className="text-5xl text-white-600 font-bold mb-4 ">Explore the World</h1>
            <p className="mb-6">Details about the countries on earth right under your mouse</p>
            <button
              onClick={() => nav('/app')}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              go to country App
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
  
}
