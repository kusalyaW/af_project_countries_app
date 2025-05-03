import React, { useState, useEffect, useContext } from 'react';
import {
  getAll, searchByName,
  filterByRegion, filterByLang
} from '../api/countries';
import {
  getFavorites, addFavorite,
  removeFavorite
} from '../api/favorites';
import FilterBar from '../components/filterBar';
import CountryCard from '../components/countryCard';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState('');
  const [lang, setLang] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { token } = useContext(AuthContext);

  const loadCountries = async () => {
    setLoading(true);
    try {
      let res;
      if (search) res = await searchByName(search);
      else if (region) res = await filterByRegion(region);
      else if (lang) res = await filterByLang(lang);
      else res = await getAll();
      setCountries(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const loadFavorites = async () => {
    if (!token) return;
    try {
      const res = await getFavorites();
      setFavorites(res.data);
    } catch (err) {
      console.error('Failed to load favorites:', err);
      // Optionally redirect to login or show a message
    }
  };
  

  const handleFilter = () => loadCountries();

  const handleFavToggle = async (code) => {
    if (!token) return alert('Login to manage favorites');
    const res = favorites.includes(code)
      ? await removeFavorite(code)
      : await addFavorite(code);
    setFavorites(res.data);
  };

  useEffect(() => { loadCountries(); }, []);
  useEffect(() => { loadFavorites(); }, [token]);

  return (
    <>
      <FilterBar
        region={region} setRegion={setRegion}
        lang={lang} setLang={setLang}
        search={search} setSearch={setSearch}
        onFilter={handleFilter}
      />
      {loading
        ? <p>Loading...</p>
        : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map(c => (
              <CountryCard
                key={c.cca3}
                country={c}
                isFav={favorites.includes(c.cca3)}
                onFavToggle={handleFavToggle}
              />
            ))}
          </div>
      }
    </>
  );
};

export default Home;
