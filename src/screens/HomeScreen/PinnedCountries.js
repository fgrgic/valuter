import React, { useContext, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { CountriesContext, RatesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';
import PanelContent from './PanelContent';

const PinnedCountries = () => {
  const { countries } = useContext(CountriesContext);
  const { rates } = useContext(RatesContext);

  const [currentValues, setCurrentValues] = useState(
    JSON.parse(JSON.stringify(countries)).map((v) => {
      return {
        [v.currency.code]: 0,
      };
    })
  );

  const [panelCountry, setPanelCountry] = useState({});
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: false,
    noBackgroundOpacity: true,
    closeOnTouchOutside: true,
    style: {
      maxWidth: 700,
    },
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const updateCurrencies = (currencyCode, value) => {
    let newValues = JSON.parse(JSON.stringify(currentValues));
    const changeIndex = newValues
      .map((e) => Object.keys(e)[0])
      .indexOf(currencyCode);

    value = value.replace(',', '.');
    if (value.endsWith('.')) {
      newValues[changeIndex] = {
        [currencyCode]: value,
      };
      setCurrentValues(newValues);
      return;
    }

    const valueInEuros = value / rates[currencyCode];

    newValues = newValues.map((newValue, index) => {
      if (index === changeIndex) return;
      const currencyRate = rates[Object.keys(newValue)[0]];
      const num = valueInEuros * currencyRate;
      return {
        [Object.keys(newValue)[0]]: parseFloat(value)
          ? (valueInEuros * currencyRate).toFixed(2)
          : 0,
      };
    });

    newValues[changeIndex] = {
      [currencyCode]: parseFloat(value) ? parseFloat(value) : 0,
    };

    setCurrentValues(newValues);
  };

  useEffect(() => {
    setCurrentValues(
      JSON.parse(JSON.stringify(countries)).map((v) => {
        return {
          [v.currency.code]: currentValues[v.currency.code]
            ? currentValues[v.currency.code]
            : 0,
        };
      })
    );
  }, [countries]);

  const renderItem = (item, index) => {
    return (
      <View key={item.id} style={[styles.item]}>
        <TouchableOpacity
          onPress={() => {
            setPanelCountry(item);
            openPanel();
          }}
          style={styles.countryInfoContainer}
        >
          <PoppinsText italic primary fontSize={ds.fontSize[0]}>
            {item.name}
          </PoppinsText>

          <PoppinsText bold primary fontSize={ds.fontSize[3]}>
            {item.currency}
          </PoppinsText>
        </TouchableOpacity>
        <View style={styles.currencyInputContainer}>
          <TextInput
            style={styles.currencyInput}
            carretHidden
            selectTextOnFocus
            maxLength={10}
            blurOnSubmit
            keyboardType="numeric"
            onChangeText={(input) => {
              updateCurrencies(item.currency, input);
            }}
            placeholder={JSON.stringify(currentValues[index][item.currency])}
            value={
              currentValues[index][item.currency] > 0
                ? '' + currentValues[index][item.currency]
                : ''
            }
          ></TextInput>
        </View>
      </View>
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {countries.map((country, index) => {
          return renderItem(
            {
              id: country.id,
              name: country.name,
              currency: country.currency.code,
              flag: country.flag,
              tld: country.tld,
              callingCode: country.callingCode,
              population: country.population,
              capital: country.capital,
            },
            index
          );
        })}
      </KeyboardAwareScrollView>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <PanelContent country={panelCountry} close={closePanel} />
      </SwipeablePanel>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: ds.padding[6],
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: ds.padding[3],
    width: '90%',
  },
  countryInfoContainer: {
    flexShrink: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  currencyInputContainer: {
    width: '40%',
    maxWidth: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  currencyInput: {
    flexGrow: 1,
    color: ds.primary,
    backgroundColor: ds.white,
    borderRadius: 10,
    padding: ds.padding[3],
    fontSize: ds.fontSize[3],
    fontFamily: 'poppins-extra-bold',
    textAlign: 'right',
  },
});

export default PinnedCountries;
