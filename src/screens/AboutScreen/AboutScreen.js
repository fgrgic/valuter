import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SettingsContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';
import { AMOLED, DARK, DEFAULT, LIGHT } from '../../constants';
import * as ds from '../../constants/styles';
import SchemeOption from './SchemeOption';

const AboutScreen = () => {
  const { colors, settings } = useContext(SettingsContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.almostWhite }]}
    >
      <View style={styles.screenTitle}>
        <PoppinsText primary bold fontSize={ds.fontSize[4]}>
          Settings
        </PoppinsText>
      </View>
      <View style={styles.settingTitle}>
        <PoppinsText primary fontSize={ds.fontSize[2]}>
          Color Scheme
        </PoppinsText>
      </View>
      <View style={styles.optionsContainer}>
        {[
          { scheme: LIGHT, displayColor: ds.almostWhite, name: 'Light' },
          { scheme: DARK, displayColor: ds.primary, name: 'Dark' },
          {
            scheme: AMOLED,
            displayColor: ds.black,
            name: 'Black (oled screens)',
          },
          {
            scheme: DEFAULT,
            displayColor: colors.white,
            name: 'System default',
          },
        ].map((option) => {
          return (
            <SchemeOption
              key={option.scheme}
              name={option.name}
              selected={settings.scheme === option.scheme}
              color={option.displayColor}
              scheme={option.scheme}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  screenTitle: {
    width: '90%',
    paddingVertical: ds.padding[3],
  },
  settingTitle: {
    width: '90%',
    paddingVertical: ds.padding[3],
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
  },
});

export default AboutScreen;
