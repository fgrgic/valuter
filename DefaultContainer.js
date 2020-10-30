import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FIXER_ACCESS } from './src/keys';
import * as storageUtils from './src/utils/Storage';

export const CountriesContext = React.createContext({
  countries: null,
  setCountries: () => {},
});

export const RatesContext = React.createContext({
  rates: null,
  setRates: () => {},
});

const DefaultContainer = (props) => {
  const [countries, setCountries] = useState([]);
  const [rates, setRates] = useState(null);

  const updateRates = async () => {
    try {
      const response = await axios.get('http://data.fixer.io/api/latest', {
        params: { access_key: FIXER_ACCESS },
      });
      setRates(response.data);
      storageUtils.saveRates(response.data);
    } catch (e) {
      console.log("Couldn't fetch new rates, using old ones instead");
      setRates(storageUtils.loadRates());
    }
  };

  const pinCountry = (newCountry) => {
    setCountries([
      ...countries,
      {
        id: newCountry.alpha3Code,
        name: newCountry.name,
        capital: newCountry.capital,
        population: newCountry.population,
        currency: {
          ...newCountry.currencies[0],
        },
        flag: newCountry.flag,
        tld: newCountry.topLevelDomain[0],
        callingCode: newCountry.callingCodes[0],
      },
    ]);
  };

  const unpinCountry = (id) => {
    let newCountries = [];
    countries.forEach((country) => {
      if (country.id !== id) {
        newCountries.push({ ...country });
      }
    });
    setCountries(newCountries);
  };

  useEffect(() => {
    updateRates();
  }, []);

  useEffect(() => {
    storageUtils.savePinned(countries);
  }, [countries]);

  return (
    <CountriesContext.Provider value={{ countries, pinCountry, unpinCountry }}>
      <RatesContext.Provider value={{ rates, updateRates }}>
        {props.children}
      </RatesContext.Provider>
    </CountriesContext.Provider>
  );
};

export default DefaultContainer;
