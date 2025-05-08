import React, {
    useState,
    useEffect,
    useContext,
    useCallback
  } from 'react';
  import Sidebar from '../components/sideBar';
  import FilterBar from '../components/filterBar';
  import CountryCard from '../components/countryCard';
  import { AuthContext } from '../context/AuthContext';
  import {
    getAll,
    searchByName,
    filterByRegion,
    filterByLang
  } from '../api/countries';
  import {
    getFavorites,
    addFavorite,
    removeFavorite
  } from '../api/favorites';
  
  export default function Home() {
    const [countries,       setCountries]      = useState([]);
    const [selectedCountry, setSelectedCountry]= useState(null);
    const [loading,         setLoading]        = useState(false);
    const [region,          setRegion]         = useState('');
    const [lang,            setLang]           = useState('');
    const [search,          setSearch]         = useState('');
    const [favorites,       setFavorites]      = useState([]);
    const { token }                            = useContext(AuthContext);
    const [sort,            setSort]           = useState('');
    const [sidebarOpen,     setSidebarOpen]    = useState(false);
  
    const loadCountries = useCallback(async () => {
      setLoading(true);
      try {
        let res;
        if (search)           res = await searchByName(search);
        else if (region)      res = await filterByRegion(region);
        else if (lang) {
          const all = await getAll();
          const filtered = all.data.filter(c => {
            const codes = Object.keys(c.languages || {});
            const names = Object.values(c.languages || {})
                              .map(n => n.toLowerCase());
            return codes.includes(lang) ||
                   names.some(n => n.startsWith(lang));
          });
          res = { data: filtered };
        } else {
          res = await getAll();
        }
  
        let list = res.data;
        switch (sort) {
          case 'name-asc':
            list.sort((a,b) => a.name.common.localeCompare(b.name.common));
            break;
          case 'name-desc':
            list.sort((a,b) => b.name.common.localeCompare(a.name.common));
            break;
          case 'pop-asc':
            list.sort((a,b) => a.population - b.population);
            break;
          case 'pop-desc':
            list.sort((a,b) => b.population - a.population);
            break;
        }
  
        setCountries(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, [search, region, lang, sort]);
  
    useEffect(() => {
      const id = setTimeout(loadCountries, 300);
      return () => clearTimeout(id);
    }, [loadCountries]);
  
    const loadFavorites = async () => {
      if (!token) return;
      try {
        const res = await getFavorites();
        setFavorites(res.data);
      } catch (err) {
        console.error('Failed to load favorites:', err.response?.data || err.message);
      }
    };
    useEffect(() => { loadFavorites(); }, [token]);
  
    const handleFavToggle = async code => {
      if (!token) return alert('Login first!');
      try {
        const res = favorites.includes(code)
          ? await removeFavorite(code)
          : await addFavorite(code);
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleCardClick = country => {
      setSelectedCountry(country);
    };
  
    return (
      <div className="fixed inset-x-0 top-16 bottom-0 flex overflow-hidden">
        {/* Mobile Filters button */}
        <button
          className="absolute top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          Filters
        </button>
  
        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
  
        {/* Sidebar & Main */}
        <div className="flex h-full w-full">
          <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(false)}>
            <FilterBar
              region={region}     setRegion={setRegion}
              lang={lang}         setLang={setLang}
              search={search}     setSearch={setSearch}
              sort={sort}         setSort={setSort}
            />
          </Sidebar>
  
          <main className="flex-1 overflow-auto p-4 relative">
            {loading ? (
              <p>Loading…</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.map(c => (
                  <CountryCard
                    key={c.cca3}
                    country={c}
                    isFav={favorites.includes(c.cca3)}
                    onFavToggle={() => handleFavToggle(c.cca3)}
                    onClick={() => handleCardClick(c)}
                  />
                ))}
              </div>
            )}
  
            {/* Modal Detail */}
            {selectedCountry && (
              <div
                className="fixed inset-0 z-50 top-14 flex items-start sm:items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto"
                onClick={() => setSelectedCountry(null)}
              >
                <div
                  className="relative bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-gray-900 max-h-[90vh] overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedCountry(null)}
                  >
                    ✕
                  </button>
                  <img
                    src={selectedCountry.flags.svg}
                    alt={selectedCountry.name.common}
                    className="h-40 w-auto object-contain rounded-md mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-semibold mb-2">
                    {selectedCountry.name.common}
                  </h2>
                  <p data-testid="modal-official"><strong>Official:</strong> {selectedCountry.name.official}</p>
                  <p data-testid="modal-population"><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                  <p data-testid="modal-region"><strong>Region:</strong> {selectedCountry.region}</p>
                  <p data-testid="modal-capital"><strong>Capital:</strong> {selectedCountry.capital?.[0] || '—'}</p>
                  <p data-testid="modal-languages">
                    <strong>Languages:</strong>{' '}
                    {Object.values(selectedCountry.languages || {}).join(', ')}
                  </p>
                  <p data-testid="modal-currencies">
              <strong>Currencies:</strong>{' '}
              {selectedCountry.currencies
                ? Object.values(selectedCountry.currencies)
                    .map(c => c.name)
                    .join(', ')
                : '—'}
            </p>

            {/* NEW: Timezones */}
            <p data-testid="modal-timezones">
              <strong>Timezones:</strong>{' '}
              {selectedCountry.timezones?.join(', ') || '—'}
            </p>

            {/* NEW: Border Countries */}
            <p data-testid="modal-borders">
              <strong>Border Countries:</strong>{' '}
              {selectedCountry.borders?.length
                ? selectedCountry.borders.join(', ')
                : 'None'}
            </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
  