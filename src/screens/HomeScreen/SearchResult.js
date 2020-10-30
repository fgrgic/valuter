import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { CountriesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const SearchResult = ({ result }) => {
  const { countries } = useContext(CountriesContext);

  const contains = () => {
    let found = false;
    countries.forEach((country) => {
      if (country.id === result.alpha3Code) found = true;
    });
    return found;
  };

  return (
    <View style={styles.container}>
      <PoppinsText bold accent>
        {result.name}
      </PoppinsText>
      {result.currencies[0] && (
        <>
          <MaterialCommunityIcons
            name={contains() === true ? 'pin' : 'pin-off-outline'}
            size={20}
            color={ds.primary}
          />
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
    paddingVertical: ds.padding[2],
  },
});

export default SearchResult;
