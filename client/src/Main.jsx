import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
function Root() {
  useEffect(() => {
    console.log('🚀 API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
