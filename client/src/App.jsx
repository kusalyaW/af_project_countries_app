// client/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

//import Header   from './components/Header';
import Footer   from './components/Footer';
import Landing  from './pages/Landing';
import NavBar    from './components/NavBar';
import Home     from './pages/Home';
import Country  from './pages/Country';
import Favorites from './pages/Favorites';
import Login    from './pages/Login';
import Register from './pages/Register';

function Layout({ children }) {
  const { pathname } = useLocation();
  // show the navbar on every route except exact "/"
  const showNav = pathname !== '/';

  return (
    <>
      {showNav && <NavBar />}
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <Footer />
    </>
  );
}
export default function App() {
  // optional: console.log your API URL
  useEffect(() => {
    console.log('🚀 API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/"         element={<Landing />} />
            <Route path="/app"      element={<Home />} />
            <Route path="/country/:code" element={<Country />} />
            <Route path="/favorites"     element={<Favorites />} />
            <Route path="/login"         element={<Login />} />
            <Route path="/register"      element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
