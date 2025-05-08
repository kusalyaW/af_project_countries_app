import React, { useState, useEffect, useContext } from 'react';
import { getFavorites, removeFavorite } from '../api/favorites';
import { getByCode } from '../api/countries';
import CountryCard from '../components/countryCard';
import { AuthContext } from '../context/AuthContext';


const Favorites = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { token } = useContext(AuthContext);

  const loadFavorites = async () => {
    const res = await getFavorites();
    setFavorites(res.data);
    const data = await Promise.all(res.data.map(code => getByCode(code)));
    setCountries(data.map(r => r.data[0]));
  };

  const handleFavToggle = async (code) => {
    const res = await removeFavorite(code);
    setFavorites(res.data);
    setCountries(cs => cs.filter(c => c.cca3 !== code));
  };

  useEffect(() => {
    if (token) loadFavorites();
  }, [token]);

  if (!token) return <p>Please login to see favorites.</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">My Favorites</h2>
      {countries.length === 0
        ? <p>No favorites yet.</p>
        : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map(c => (
              <CountryCard
                key={c.cca3}
                country={c}
                isFav={true}
                onFavToggle={handleFavToggle}
              />
            ))}
          </div>
      }
    </div>
    
  );
};

export default Favorites;
