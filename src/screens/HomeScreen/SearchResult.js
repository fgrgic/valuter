import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CountriesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const SearchResult = ({ result }) => {
  const { countries, pinCountry, unpinCountry, isPinned } = useContext(
    CountriesContext
  );
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    setPinned(isPinned(result.alpha3Code));
  }, []);

  return (
    result.currencies[0] &&
    result.currencies[0].code && (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <>
            <PoppinsText italic primaryLightest>
              {result.name}
            </PoppinsText>
            <PoppinsText bold primary fontSize={ds.fontSize[2]}>
              {result.currencies[0].code} ({result.currencies[0].name})
            </PoppinsText>
          </>
        </View>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => {
            if (pinned) {
              unpinCountry(result.alpha3Code);
              setPinned(false);
            } else setPinned(pinCountry(result));
          }}
        >
          <MaterialCommunityIcons
            name={pinned ? 'pin' : 'pin-off-outline'}
            size={25}
            color={ds.primary}
          />
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ds.padding[2],
    width: '100%',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  pinButton: {
    flexGrow: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchResult;
