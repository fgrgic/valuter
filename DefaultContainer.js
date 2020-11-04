import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { AMOLED, DARK, DEFAULT, LIGHT } from './src/constants';
import * as colorsLight from './src/constants/colors';
import * as colorsAmoled from './src/constants/colors-amoled';
import * as colorsDark from './src/constants/colors-dark';
import { FIXER_ACCESS } from './src/keys';
import * as storageUtils from './src/utils/Storage';

export const CountriesContext = React.createContext({
  countries: null,
  setCountries: () => {},
  pinCountry: () => {},
  unpinCountry: () => {},
  isPinned: () => {},
});

export const RatesContext = React.createContext({
  rates: null,
  setRates: () => {},
  updateRates: () => {},
});

export const SettingsContext = React.createContext({
  settings: null,
  setSettings: () => {},
  colors: null,
  setColors: () => {},
});

const DefaultContainer = (props) => {
  const [countries, setCountries] = useState([]);
  const [rates, setRates] = useState(null);
  const [settings, setSettings] = useState(null);
  const [colors, setColors] = useState(null);

  const colorScheme = useColorScheme();

  const updateRates = async () => {
    try {
      const response = await axios.get('http://data.fixer.io/api/latest', {
        params: { access_key: FIXER_ACCESS },
      });
      setRates(response.data.rates);
      storageUtils.saveRates(response.data.rates);
    } catch (e) {
      console.log("Couldn't fetch new rates, using old ones instead");
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

  const clearAllPins = () => {
    setCountries([]);
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
        newCountries.push(JSON.parse(JSON.stringify(country)));
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

  const initializeSettings = async () => {
    const storageSettings = await storageUtils.loadSettings();
    if (storageSettings) {
      setSettings(storageSettings);
    } else {
      setSettings({ scheme: DEFAULT });
    }
  };

  const updateScheme = (scheme) => {
    setSettings({ ...settings, scheme });
  };

  useEffect(() => {
    initializePins();
    // updateRates();
    initializeRates();
    initializeSettings();
  }, []);

  useEffect(() => {
    if (countries && countries.length >= 0) {
      storageUtils.savePinned(countries);
    }
  }, [countries]);

  useEffect(() => {
    if (!settings) return;

    storageUtils.saveSettings(settings);

    switch (settings.scheme) {
      case AMOLED:
        setColors(colorsAmoled);
        break;
      case DARK:
        setColors(colorsDark);
        break;
      case LIGHT:
        setColors(colorsLight);
        break;
      default:
        if (colorScheme === DARK) setColors(colorsDark);
        else setColors(colorsLight);
    }
  }, [settings]);

  useEffect(() => {
    if (!settings) return;
    if (settings.scheme === DEFAULT) {
      if (colorScheme === 'dark') setColors(colorsDark);
      else setColors(colorsLight);
    }
  }, [colorScheme]);

  return (
    <SettingsContext.Provider value={{ settings, colors, updateScheme }}>
      <CountriesContext.Provider
        value={{
          countries,
          setCountries,
          pinCountry,
          unpinCountry,
          isPinned,
          clearAllPins,
        }}
      >
        <RatesContext.Provider value={{ rates, updateRates }}>
          {props.children}
        </RatesContext.Provider>
      </CountriesContext.Provider>
    </SettingsContext.Provider>
  );
};

export default DefaultContainer;
