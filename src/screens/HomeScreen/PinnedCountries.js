import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort';
import { CountriesContext, RatesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const PinnedCountries = () => {
  const width = useWindowDimensions().width;
  const parentWidth = width;
  const childrenWidth = width - 20;
  const childrenHeight = 60;

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
    newValues[changeIndex] = { [currencyCode]: value };
    const valueInEuros = value / rates[currencyCode];

    newValues = newValues.map((newValue) => {
      const currencyRate = rates[Object.keys(newValue)[0]];
      const num = valueInEuros * currencyRate;
      return { [Object.keys(newValue)[0]]: valueInEuros * currencyRate };
    });

    // console.warn(newValues);

    setCurrentValues(newValues);
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={[styles.item, { width: parentWidth, minHeight: childrenHeight }]}
      >
        <View>
          <PoppinsText italic primary fontSize={ds.fontSize[0]}>
            {item.name}
          </PoppinsText>

          <PoppinsText bold primary fontSize={ds.fontSize[3]}>
            {item.currency}
          </PoppinsText>
        </View>
        <TextInput
          style={styles.currencyInput}
          carretHidden
          blurOnSubmit
          keyboardType="numeric"
          onChangeText={(input) => {
            updateCurrencies(item.currency, input);
          }}
          placeholder={JSON.stringify(currentValues[index][item.currency])}
          value={JSON.stringify(currentValues[index][item.currency])}
        ></TextInput>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={[styles.container, { width: parentWidth }]}
    >
      <AutoDragSortableView
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
        marginChildrenBottom={30}
        delayLongPress={75}
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
      />
    </KeyboardAvoidingView>
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
  currencyInput: {
    borderBottomWidth: 1,
    flexGrow: 1,
    maxWidth: '40%',
    padding: ds.padding[3],
    fontSize: ds.fontSize[3],
    fontFamily: 'poppins-bold',
  },
});

export default PinnedCountries;
