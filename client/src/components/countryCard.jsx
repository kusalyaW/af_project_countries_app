import React from 'react';
import { Heart, HeartOff } from 'lucide-react';

export default function CountryCard({
  country,
  isFav,
  onFavToggle,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className="relative border p-4 rounded-lg shadow hover:shadow-xl transition cursor-pointer bg-white dark:bg-gray-800  "
    >
      <button
        onClick={e => { e.stopPropagation(); onFavToggle(); }}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        className={`
          absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75
          backdrop-blur-sm shadow-md transform transition-transform duration-200
          ${isFav
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-gray-600'
          }
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isFav ? 'focus:ring-red-300' : 'focus:ring-gray-300'}
        `}
      >
        {isFav
          ? <Heart fill="currentColor" size={20} />
          : <HeartOff size={20} />
        }
      </button>

      {/* Country info */}
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="h-32 w-auto object-contain rounded-md mb-3 mx-auto"
      />
      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">{country.name.common}</h3>
      <p className="text-sm">Population: {country.population.toLocaleString()}</p>
      <p className="text-sm">Region: {country.region}</p>
      <p className="text-sm">Capital: {country.capital?.[0] || '—'}</p>
    </div>
  );
}
