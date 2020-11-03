import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';
import SearchResult from './SearchResult';

const SearchResults = ({ results, loading, clearSearch }) => {
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
          return (
            <SearchResult
              key={result.alpha3Code}
              result={result}
              clearSearch={clearSearch}
            />
          );
        })
      ) : loading ? (
        <View style={styles.loading}>
          <PoppinsText bold primary>
            Loading...
          </PoppinsText>
        </View>
      ) : (
        <View style={styles.noResults}>
          <Feather
            name="alert-circle"
            size={ds.fontSize[1]}
            color={ds.primaryLightest}
          />
          <PoppinsText
            primaryLightest
            fontSize={ds.fontSize[1]}
            style={{ paddingLeft: ds.padding[1] }}
          >
            No results found
          </PoppinsText>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
  },
  loading: {
    flexGrow: 1,
    alignSelf: 'center',
    paddingVertical: ds.padding[3],
    width: '90%',
  },
  noResults: {
    flexGrow: 1,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ds.padding[3],
    width: '90%',
  },
});

export default SearchResults;
