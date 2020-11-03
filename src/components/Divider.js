import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as ds from '../constants/styles';

const Divider = ({ height, width, color, style }) => {
  return (
    <View
      style={[
        styles.dividerDefault,
        { ...style },
        {
          backgroundColor: color ? color : ds.primary,
          height: height ? height : 1,
          width: width ? width : '100%',
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  dividerDefault: {
    height: 1,
    width: '100%',
    backgroundColor: ds.primary,
    marginVertical: ds.margin[3],
  },
});

export default Divider;
