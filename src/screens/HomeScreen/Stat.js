import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const Stat = ({ text, iconName }) => {
  return (
    <View style={styles.stat}>
      <Feather name={iconName} size={ds.fontSize[3]} color={ds.primary} />
      <PoppinsText style={styles.statText} primary fontSize={ds.fontSize[2]}>
        {text}
      </PoppinsText>
    </View>
  );
};

const styles = StyleSheet.create({
  stat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: ds.margin[0],
  },
  statText: {
    paddingLeft: ds.padding[3],
    paddingVertical: ds.padding[0],
  },
});

export default Stat;
