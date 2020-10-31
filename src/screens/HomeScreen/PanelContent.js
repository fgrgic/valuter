import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CountriesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';
import { numberWithCommas } from '../../utils/Numbers';
import Stat from './Stat';

const PanelContent = ({ country, close }) => {
  const { countries, unpinCountry } = useContext(CountriesContext);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <PoppinsText
          style={{ maxWidth: '80%' }}
          bold
          primary
          fontSize={ds.fontSize[5]}
        >
          {country.name}
        </PoppinsText>
        <TouchableOpacity
          onPress={() => {
            unpinCountry(country.id);
            close();
          }}
        >
          <Feather name="trash-2" size={30} color={ds.accent} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.statsContainer}>
        <Stat iconName="home" text={country.capital} />
        <Stat iconName="user" text={numberWithCommas(country.population)} />
        <Stat iconName="globe" text={country.tld} />
        <Stat iconName="dollar-sign" text={country.currency} />
        <Stat iconName="phone" text={'+' + country.callingCode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: ds.margin[2],
    marginBottom: ds.margin[3],
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%',
    marginVertical: ds.margin[3],
  },
  divider: {
    height: 1,
    width: '90%',
    backgroundColor: ds.primary,
    marginVertical: ds.margin[3],
  },
});

export default PanelContent;
