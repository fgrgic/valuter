import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
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
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  const inputRef = useRef();

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
          found={resultFound}
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
