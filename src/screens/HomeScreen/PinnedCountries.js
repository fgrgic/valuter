import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CountriesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const PinnedCountries = () => {
  const { countries } = useContext(CountriesContext);

  return (
    <ScrollView style={styles.container}>
      {countries.map((country) => {
        return <PoppinsText>{country.name}</PoppinsText>;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: ds.padding[4],
  },
});

export default PinnedCountries;
