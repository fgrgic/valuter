import React from 'react';
import { ScrollView } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import SearchResult from './SearchResult';

const SearchResults = ({ results, found }) => {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        paddingBottom: 150,
      }}
      style={{
        height: '100%',
      }}
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

export default SearchResults;
