import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { CountriesContext, RatesContext } from '../../../DefaultContainer';
import Divider from '../../components/Divider';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';
import PanelContent from './PanelContent';

const PinnedCountries = () => {
  const { countries, clearAllPins } = useContext(CountriesContext);
  const { rates } = useContext(RatesContext);

  const [currentValues, setCurrentValues] = useState(
    JSON.parse(JSON.stringify(countries)).map((v, index) => {
      return {
        [v.currency.code]: 0,
      };
    })
  );

  const countriesScroll = useRef(null);

  const [panelCountry, setPanelCountry] = useState({});
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    onlyLarge: true,
    showCloseButton: false,
    noBackgroundOpacity: true,
    closeOnTouchOutside: true,
    style: {
      maxWidth: 700,
      maxHeight: 800,
    },
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const clearAllAlert = () =>
    Alert.alert(
      'Clear all pins?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            clearAllPins();
          },
        },
      ],
      { cancelable: false }
    );

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
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
      behavior="padding"
      enabled
    >
      <ScrollView
        ref={countriesScroll}
        onContentSizeChange={() => {
          countriesScroll.current.scrollToEnd({ animated: true });
        }}
        keyboardDismissMode="on-drag"
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
        <Divider
          color={ds.primary20}
          width="90%"
          style={{ marginVertical: ds.margin[6] }}
        />
        <TouchableOpacity
          style={styles.clearAllButton}
          onPress={() => {
            clearAllAlert();
          }}
        >
          <MaterialCommunityIcons
            name="pin-off"
            size={ds.fontSize[1]}
            color={ds.accent}
          />
          <PoppinsText
            accent
            fontSize={ds.fontSize[1]}
            style={{ paddingLeft: ds.padding[1] }}
          >
            Unpin all
          </PoppinsText>
        </TouchableOpacity>
      </ScrollView>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <PanelContent country={panelCountry} close={closePanel} />
      </SwipeablePanel>
    </KeyboardAvoidingView>
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
  clearAllButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    // paddingTop: ds.padding[3],
  },
});

export default PinnedCountries;
