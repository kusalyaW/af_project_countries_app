import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country, isFav, onFavToggle }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg transition relative">
    <button
      onClick={() => onFavToggle(country.cca3)}
      className="absolute top-2 right-2 text-xl"
    >
      {isFav ? '❤️' : '🤍'}
    </button>
    <Link to={`/country/${country.cca3}`}>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="h-32 w-full object-cover mb-2"
      />
      <h3 className="font-bold">{country.name.common}</h3>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital?.[0]}</p>
    </Link>
  </div>
);

export default CountryCard;
