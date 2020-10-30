import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';
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
      {/* <Text>{JSON.stringify(results)}</Text> */}
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
    alignSelf: 'flex-start',
    height: '100%',
    width: '100%',
    padding: ds.padding[4],
  },
});

export default SearchResults;
