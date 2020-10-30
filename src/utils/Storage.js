import AsyncStorage from '@react-native-community/async-storage';
import { PINNED_COUNTRIES, RATES } from '../constants';

export const saveRates = async (rates) => {
  if (rates) {
    await AsyncStorage.setItem(RATES, JSON.stringify(rates));
  }
};

export const loadRates = async () => {
  const storageRates = await AsyncStorage.getItem(RATES);
  return storageRates;
};

export const savePinned = async (countries) => {
  if (countries) {
    await AsyncStorage.setItem(PINNED_COUNTRIES, JSON.stringify(countries));
  }
};

export const loadPinned = async () => {
  const storagePinnedCountries = await AsyncStorage.getItem(PINNED_COUNTRIES);
  return storagePinnedCountries;
};
