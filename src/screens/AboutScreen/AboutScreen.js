import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingsContext } from '../../../DefaultContainer';
import { PoppinsText } from '../../components/TextComponents/PoppinsText';

const AboutScreen = () => {
  const { colors } = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.almostWhite }]}>
      <PoppinsText primary>About</PoppinsText>
      <PoppinsText primary>About</PoppinsText>
      <PoppinsText primary>About</PoppinsText>
      <PoppinsText primary>About</PoppinsText>
    </View>
  );
};

const styles = StyleSheet.create({ container: { height: '100%' } });

export default AboutScreen;
