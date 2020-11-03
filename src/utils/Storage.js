import AsyncStorage from '@react-native-community/async-storage';
import { PINNED_COUNTRIES, RATES, SETTINGS } from '../constants';

export const saveRates = async (rates) => {
  if (rates) {
    await AsyncStorage.setItem(RATES, JSON.stringify(rates));
  }
};

export const loadRates = async () => {
  const storageRates = await AsyncStorage.getItem(RATES);
  return JSON.parse(storageRates);
};

export const savePinned = async (countries) => {
  if (countries) {
    await AsyncStorage.setItem(PINNED_COUNTRIES, JSON.stringify(countries));
  }
};

export const loadPinned = async () => {
  const storagePinnedCountries = await AsyncStorage.getItem(PINNED_COUNTRIES);
  return JSON.parse(storagePinnedCountries);
};

export const saveSettings = async (settings) => {
  if (settings) {
    await AsyncStorage.setItem(SETTINGS, JSON.stringify(settings));
  }
};

export const loadSettings = async () => {
  const storageSettings = await AsyncStorage.getItem(SETTINGS);
  return JSON.parse(storageSettings);
};
