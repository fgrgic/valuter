import axios from 'axios';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DelayInput from 'react-native-debounce-input';
import { CountriesContext, RatesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';
import SearchResults from './SearchResults';

const HomeScreen = () => {
  const { countries } = useContext(CountriesContext);
  const { rates } = useContext(RatesContext);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [resultFound, setResultFound] = useState(true);
  // const [rates, setRates] = useState({});

  const inputRef = createRef();

  const searchCountry = async (query) => {
    try {
      const response = await axios.get(
        'https://restcountries.eu/rest/v2/name/' + query
      );
      setResultFound(true);
      setSearchResults(response);
    } catch (e) {
      try {
        const response = await axios.get(
          'https://restcountries.eu/rest/v2/currency/' + query
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
    else setSearchResults('');
  }, [search]);

  return (
    <SafeAreaView>
      <DelayInput
        style={styles.searchBar}
        clearButtonMode="always"
        placeholder="Search"
        inputRef={inputRef}
        minLength={1}
        delayTimeout={200}
        onChangeText={(value) => {
          setSearch(value);
        }}
        value={search}
      />
      {search ? (
        <SearchResults results={searchResults} found={resultFound} />
      ) : (
        <>
          {!countries ? (
            <PoppinsText primary bold fontSize={ds.fontSize[4]}>
              No pinned countries. To start pinning, use search
            </PoppinsText>
          ) : (
            <PoppinsText
              style={styles.title}
              accent
              bold
              fontSize={ds.fontSize[6]}
            >
              Pinned
            </PoppinsText>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? statusBarHeight : 0,
  },
  title: {
    alignSelf: 'flex-start',
  },
  searchBar: {
    borderColor: ds.primary,
    borderBottomWidth: 1,
    paddingVertical: ds.padding[3],
    marginHorizontal: ds.margin[4],
    fontFamily: 'poppins-bold',
    fontSize: ds.fontSize[2],
  },
});

export default HomeScreen;
