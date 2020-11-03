import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { CountriesContext } from '../../../DefaultContainer';
import * as ds from '../../constants/styles';
import useDebounce from '../../hooks/useDebounce';
import NoPins from './NoPins';
import PinnedCountries from './PinnedCountries';
import SearchResults from './SearchResults';

const HomeScreen = () => {
  const { countries } = useContext(CountriesContext);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [isSearching, setIsSearching] = useState(true);
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  const inputRef = useRef();
  const debouncedSearchTerm = useDebounce(search, 300);

  const searchCountry = async (query) => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        'https://restcountries.eu/rest/v2/currency/' + query
      );
      setSearchResults(response);
    } catch (e) {
      try {
        const response = await axios.get(
          'https://restcountries.eu/rest/v2/name/' + query
        );
        setSearchResults(response);
      } catch (er) {
        setSearchResults('');
      }
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCountry(debouncedSearchTerm);
    } else {
      setSearchResults('');
    }
  }, [debouncedSearchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={[
          styles.searchBar,
          { borderBottomColor: searchBarFocus ? ds.primary : ds.primary20 },
        ]}
        clearButtonMode="always"
        placeholder="Search"
        placeholderTextColor={searchBarFocus ? ds.primary30 : ds.primary20}
        inputRef={inputRef}
        minLength={1}
        selectTextOnFocus
        onFocus={() => setSearchBarFocus(true)}
        onBlur={() => setSearchBarFocus(false)}
        onChangeText={(value) => {
          setSearch(value);
        }}
        value={search}
      />
      {search && search.length > 0 ? (
        <SearchResults
          results={searchResults}
          loading={isSearching}
          clearSearch={() => {
            setSearch('');
          }}
        />
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
    backgroundColor: ds.almostWhite,
  },
  title: {
    alignSelf: 'flex-start',
  },
  searchBar: {
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
  searchBarFocus: {
    borderColor: ds.accent,
  },
  searchBarUnfocus: {
    borderColor: ds.primary50,
  },
});

export default HomeScreen;
