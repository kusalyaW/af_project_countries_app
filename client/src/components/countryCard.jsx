// client/src/components/CountryCard.jsx
import React, { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';

export default function CountryCard({
  country,
  isFav,
  onFavToggle,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`
        relative border p-4 rounded-lg shadow hover:shadow-xl transition
        bg-white dark:bg-gray-800 cursor-pointer
      `}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Favorite toggle */}
      <button
        onClick={e => { e.stopPropagation(); onFavToggle(); }}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        className={`
          absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75
          backdrop-blur-sm shadow-md transform transition-transform duration-200
          ${isFav
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-gray-600'}
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isFav ? 'focus:ring-red-300' : 'focus:ring-gray-300'}
        `}
      >
        {isFav
          ? <Heart fill="currentColor" size={20} />
          : <HeartOff size={20} />
        }
      </button>

      {/* Flag and name */}
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="h-32 w-auto object-contain rounded-md mb-3 mx-auto"
      />
      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">
        {country.name.common}
      </h3>
      <p className="text-sm mb-2">Population: {country.population.toLocaleString()}</p>
      <p className="text-sm mb-2">Region: {country.region}</p>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>Official:</strong> {country.name.official}</p>
          {country.capital && <p><strong>Capital:</strong> {country.capital[0]}</p>}
          {country.subregion && <p><strong>Subregion:</strong> {country.subregion}</p>}
          {country.languages && (
            <p>
              <strong>Languages:</strong>{' '}
              {Object.values(country.languages).join(', ')}
            </p>
          )}
          {country.currencies && (
            <p>
              <strong>Currencies:</strong>{' '}
              {Object.values(country.currencies).map(c => c.name).join(', ')}
            </p>
          )}
          {country.borders && country.borders.length > 0 && (
            <p><strong>Borders:</strong> {country.borders.join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
}
