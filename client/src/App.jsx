// client/src/App.jsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import NavBar     from './components/NavBar';
import Footer     from './components/Footer';
import Landing    from './pages/Landing';
import Home       from './pages/Home';
import Country    from './pages/Country';
import Favorites  from './pages/Favorites';
import Login      from './pages/Login';
import Register   from './pages/Register';

function AppContent() {
  // grab the current path
  const { pathname } = useLocation();

  // list of routes where you DO NOT want the footer
  const noFooterPaths = ['/app'];

  return (
    <>
     

      <main className="pt-16 flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/"         element={<Landing />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app"      element={<Home />} />
          <Route path="/country/:code" element={<Country />} />
          <Route path="/favorites"     element={<Favorites />} />
        </Routes>
      </main>

      {/* only render footer if current path is not in noFooterPaths */}
      {!noFooterPaths.includes(pathname) && <Footer />}
    </>
  );
}

export default function App() {
  useEffect(() => {
    console.log('API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
