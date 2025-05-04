// client/src/api/favorites.js
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

// now these will call "http://localhost:5000/api/favorites" in dev
// and "https://your-backend.example.com/api/favorites" in prod
export const getFavorites   = () => axios.get(`${API}/api/favorites`);
export const addFavorite    = code => axios.post(`${API}/api/favorites`, { code });
export const removeFavorite = code => axios.delete(`${API}/api/favorites/${code}`);
