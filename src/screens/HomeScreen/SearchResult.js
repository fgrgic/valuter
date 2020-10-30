import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const SearchResult = ({ result }) => {
  return (
    <View style={styles.container}>
      <PoppinsText bold accent>
        {result.name}
      </PoppinsText>
      {result.currencies[0] && (
        <>
          <PoppinsText bold fontSize={ds.fontSize[2]}>
            {result.currencies[0].code} ({result.currencies[0].name})
          </PoppinsText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ds.padding[2],
  },
});

export default SearchResult;
