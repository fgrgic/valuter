import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { CountriesContext, RatesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const PinnedCountries = () => {
  const width = useWindowDimensions().width;
  const parentWidth = width;
  const childrenWidth = width - 20;
  const childrenHeight = useWindowDimensions().height * 0.15;

  const { countries, swapCountries } = useContext(CountriesContext);
  const { rates } = useContext(RatesContext);

  const [data, setData] = useState(JSON.parse(JSON.stringify(countries)));
  const [valueInput, setValueInput] = useState({ value: '', currency: '' });
  const [currentValues, setCurrentValues] = useState(
    data.map((v) => {
      return {
        [v.currency.code]: 0,
      };
    })
  );

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

    // console.warn(newValues);

    setCurrentValues(newValues);
  };

  const renderItem = (item, index) => {
    return (
      <View key={item.id}
        style={[styles.item, { width: parentWidth, minHeight: childrenHeight }]}
      >
        <View style={styles.countryInfoContainer}>
          <PoppinsText italic primary fontSize={ds.fontSize[0]}>
            {item.name}
          </PoppinsText>

          <PoppinsText bold primary fontSize={ds.fontSize[3]}>
            {item.currency}
          </PoppinsText>
        </View>
        <View style={styles.currencyInputContainer}>
          <TextInput
            style={styles.currencyInput}
            carretHidden
            selectTextOnFocus
            maxLength={7}
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
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container, { width: parentWidth }]}
    >
      {data.map((country, index) => {
        return renderItem(
          {
            key: country.id,
            name: country.name,
            currency: country.currency.code,
            value: currentValues[country.currency.code],
          },
          index
        );
      })}
      {/* <AutoDragSortableView
        dataSource={data.map((country) => {
          return {
            key: country.id,
            name: country.name,
            currency: country.currency.code,
            value: currentValues[country.currency.code],
          };
        })}
        parentWidth={parentWidth}
        childrenWidth={childrenWidth}
        childrenHeight={childrenHeight}
        marginChildrenBottom={0}
        delayLongPress={75}
        sortable={false}
        onDragEnd={(a, b) => swapCountries(a, b)}
        onDataChange={(newData) => {
          if (newData.length != data.length) {
            setData({ newData });
          }
        }}
        keyExtractor={(item, index) => item.key}
        renderBottomView={<View style={{ height: 100 }}></View>}
        renderItem={(item, index) => {
          return renderItem(item, index);
        }}
      /> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    padding: ds.padding[3],
    backgroundColor: ds.dirtyWhite,
  },
  countryInfoContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '40%',
  },
  currencyInputContainer: {
    flexGrow: 1,
    maxWidth: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  currencyInput: {
    flexGrow: 1,
    borderBottomWidth: 1,
    padding: ds.padding[3],
    fontSize: ds.fontSize[3],
    fontFamily: 'poppins',
  },
});

export default PinnedCountries;
