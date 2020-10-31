import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const Stat = ({ text, iconName, title }) => {
  return (
    <View style={styles.stat}>
      <Feather name={iconName} size={ds.fontSize[4]} color={ds.primary} />
      <View style={styles.statTextContainer}>
        {title && (
          <PoppinsText
            italic
            fontSize={ds.fontSize[0]}
            style={styles.statTitle}
          >
            {title}
          </PoppinsText>
        )}
        <PoppinsText
          style={styles.statData}
          bold
          primary
          fontSize={ds.fontSize[2]}
        >
          {text}
        </PoppinsText>
      </View>
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
  statText: {},
  statTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: ds.margin[4],
    marginVertical: ds.margin[2],
  },
});

export default Stat;
