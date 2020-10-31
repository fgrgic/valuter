import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FIXER_ACCESS } from './src/keys';
import * as storageUtils from './src/utils/Storage';

export const CountriesContext = React.createContext({
  countries: null,
  setCountries: () => {},
  swapCountries: () => {},
  pinCountry: () => {},
  unpinCountry: () => {},
  isPinned: () => {},
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
      setRates(response.data.rates);
      storageUtils.saveRates(response.data.rates);
    } catch (e) {
      console.warn("Couldn't fetch new rates, using old ones instead");
      setRates(storageUtils.loadRates());
    }
  };

  const initializePins = async () => {
    const storageCountries = await storageUtils.loadPinned();
    if (storageCountries) {
      setCountries(storageCountries);
    } else {
      setCountries([]);
    }
  };

  /**
   * TESTING PURPOSES ONLY!!!
   * TODO: REMOVE BEFORE FINAL DEPLOYMENT
   * reason -- don't ping fixerr servers too much (only 1000 available per month)
   */
  const initializeRates = async () => {
    const storageRates = await storageUtils.loadRates();
    if (storageRates) {
      setRates(storageRates);
    } else {
      updateRates();
    }
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

  const isPinned = (id) => {
    let pinned = false;
    countries.forEach((country) => {
      if (country.id === id) pinned = true;
    });
    return pinned;
  };

  const pinCountry = (newCountry) => {
    let toAdd = true;
    countries.forEach((country) => {
      if (country.id === newCountry.id) toAdd = false;
      if (country.currency.code === newCountry.currencies[0].code)
        toAdd = false;
    });
    if (!toAdd) return false;

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
    return true;
  };

  /**
   * swaps two countries, but only in local storage
   * Does not update the context.
   *
   * @param {*} index1 index of the first element
   * @param {*} index2 index of the second element
   */
  const swapCountries = (index1, index2) => {
    let newCountries = JSON.parse(JSON.stringify(countries));
    [newCountries[index1], newCountries[index2]] = [
      newCountries[index2],
      newCountries[index1],
    ];

    storageUtils.savePinned(newCountries);
    setCountries(newCountries);
  };

  useEffect(() => {
    initializePins();
    // updateRates();
    initializeRates();
    // setRates(storageUtils.loadRates());
  }, []);

  useEffect(() => {
    if (countries && countries.length >= 0) {
      storageUtils.savePinned(countries);
    }
  }, [countries]);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        setCountries,
        swapCountries,
        pinCountry,
        unpinCountry,
        isPinned,
      }}
    >
      <RatesContext.Provider value={{ rates, updateRates }}>
        {props.children}
      </RatesContext.Provider>
    </CountriesContext.Provider>
  );
};

export default DefaultContainer;
