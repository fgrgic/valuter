import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SettingsContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import * as ds from '../../constants/styles';

const SchemeOption = ({ selected, name, color, scheme }) => {
  const { updateScheme } = useContext(SettingsContext);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => updateScheme(scheme)}
    >
      <View style={styles.optionContainer}>
        <View
          style={[
            styles.colorSchemeIcon,
            {
              backgroundColor: color,
              borderWidth: 2,
              borderColor: selected ? ds.accent : 'transparent',
            },
          ]}
        />
        <PoppinsText primary fontSize={ds.fontSize[1]}>
          {name}
        </PoppinsText>
      </View>
      {selected && (
        <Feather name="check" size={ds.fontSize[2]} color={ds.accent} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: ds.padding[1],
    justifyContent: 'space-between',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSchemeIcon: {
    height: ds.fontSize[3],
    width: ds.fontSize[3],
    borderRadius: ds.fontSize[3],
    marginRight: ds.margin[3],

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default SchemeOption;
