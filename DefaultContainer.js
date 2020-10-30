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
  const [countries, setCountries] = useState([{id: 'HRV'}]);
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

  const pinCountry = () => {};
  const unpinCountry = () => {};

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
