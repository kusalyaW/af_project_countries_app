import axios from 'axios';

export const getFavorites = () => axios.get('/api/favorites');
export const addFavorite = (code) => axios.post('/api/favorites', { code });
export const removeFavorite = (code) => axios.delete(`/api/favorites/${code}`);
