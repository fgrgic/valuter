import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import SearchResult from './SearchResult';

const SearchResults = ({ results, found }) => {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      style={styles.container}
    >
      {results ? (
        results.data.map((result) => {
          return <SearchResult key={result.alpha3Code} result={result} />;
        })
      ) : found ? (
        <PoppinsText bold primary>
          Loading...
        </PoppinsText>
      ) : (
        <PoppinsText bold primary>
          No Results
        </PoppinsText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
});

export default SearchResults;
