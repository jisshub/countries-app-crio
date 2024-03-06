import React, { useState, useEffect } from 'react';
import './style.css';

const Country = ({ name, flagUrl, flagDescription }) => (
  <div className="country">
    <img src={flagUrl} alt={flagDescription} />
    <h2>{name}</h2>
  </div>
);

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(err => {
        console.error('Error fetching countries:', err);
        setError(err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="countries-list">
        {countries.map((country) => (
          <Country
            key={country.cca3}
            name={country.name.common}
            flagUrl={country.flags.png}
            flagDescription={country.flags.alt}
          />
        ))}
      </div>
    );
  }
};

export default CountriesList;
