import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort';
import { CountriesContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const PinnedCountries = () => {
  const width = useWindowDimensions().width;
  const parentWidth = width;
  const childrenWidth = width - 20;
  const childrenHeight = 50;

  const { countries, swapCountries } = useContext(CountriesContext);

  const [data, setData] = useState(JSON.parse(JSON.stringify(countries)));

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
        <TextInput style={{ borderWidth: 2 }}></TextInput>
      </View>
    );
  };

  return (
    <View style={[styles.container, { width: parentWidth }]}>
      <AutoDragSortableView
        dataSource={data.map((country) => {
          return {
            key: country.id,
            name: country.name,
            currency: country.currency.code,
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
        renderItem={(item, index) => {
          return renderItem(item, index);
        }}
      />
    </View>
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
});

export default PinnedCountries;
