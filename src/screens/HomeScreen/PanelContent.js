import React from 'react';
import { Text, View } from 'react-native';

const PanelContent = ({ country }) => {
  return (
    <View>
      <Text>{country.name}</Text>
    </View>
  );
};

export default PanelContent;
