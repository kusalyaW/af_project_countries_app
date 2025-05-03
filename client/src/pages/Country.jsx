import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getByCode } from '../api/countries';

const Country = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getByCode(code);
        setCountry(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{country.name.common}</h1>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="h-48 mb-4"
      />
      <p><strong>Native Name:</strong> {country.name.nativeName && Object.values(country.name.nativeName)[0].common}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Languages:</strong> {country.languages && Object.values(country.languages).join(', ')}</p>
      <p><strong>Currencies:</strong> {country.currencies && Object.values(country.currencies).map(c => c.name).join(', ')}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Border Countries:</strong> {country.borders?.join(', ') || 'None'}</p>
    </div>
  );
};

export default Country;
