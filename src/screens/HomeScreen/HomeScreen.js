import axios from 'axios';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DelayInput from 'react-native-debounce-input';
import { CountriesContext } from '../../../DefaultContainer';
import * as ds from '../../constants/styles';
import NoPins from './NoPins';
import PinnedCountries from './PinnedCountries';
import SearchResults from './SearchResults';

const HomeScreen = () => {
  const { countries } = useContext(CountriesContext);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [resultFound, setResultFound] = useState(true);

  const inputRef = createRef();

  const searchCountry = async (query) => {
    try {
      const response = await axios.get(
        'https://restcountries.eu/rest/v2/currency/' + query
      );
      setResultFound(true);
      setSearchResults(response);
    } catch (e) {
      try {
        const response = await axios.get(
          'https://restcountries.eu/rest/v2/name/' + query
        );
        setResultFound(true);
        setSearchResults(response);
      } catch (er) {
        setResultFound(false);
        setSearchResults('');
      }
    }
  };

  useEffect(() => {
    if (search) searchCountry(search);
    else {
      setSearchResults('');
      setResultFound(true);
    }
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <DelayInput
        style={styles.searchBar}
        clearButtonMode="always"
        placeholder="Search"
        placeholderTextColor={ds.primary20}
        inputRef={inputRef}
        minLength={1}
        delayTimeout={200}
        selectTextOnFocus
        onChangeText={(value) => {
          setSearch(value);
        }}
        value={search}
      />
      {search && search.length > 0 ? (
        <SearchResults results={searchResults} found={resultFound} />
      ) : (
        <>
          {countries && countries.length === 0 ? (
            <NoPins />
          ) : (
            <PinnedCountries />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    alignSelf: 'flex-start',
  },
  searchBar: {
    borderColor: ds.primary50,
    borderBottomWidth: 1,
    paddingVertical: ds.padding[3],
    paddingHorizontal: ds.padding[0],
    marginTop: ds.margin[2],
    fontFamily: 'poppins-bold',
    fontSize: ds.fontSize[2],
    alignSelf: 'center',
    width: '90%',
    color: ds.primary,
  },
});

export default HomeScreen;
