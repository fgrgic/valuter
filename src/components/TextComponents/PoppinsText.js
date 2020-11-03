import React, { useContext } from 'react';
import { Text } from 'react-native';
import { SettingsContext } from '../../../DefaultContainer';
import * as ds from '../../constants/styles';

export const PoppinsText = (props) => {
  const { black, bold, italic, white, fontSize = ds.fontSize[0] } = props;
  const { colors } = useContext(SettingsContext);

  const textColor = () => {
    if (props.white) return { color: colors.white };
    if (props.primary) return { color: colors.primary };
    if (props.primaryLight) return { color: colors.primaryLight };
    if (props.primaryLightest) return { color: colors.primaryLightest };
    if (props.accent) return { color: colors.accent };
    if (props.accentSecondary) return { color: colors.accentSecondary };
    if (props.secondary) return { color: colors.secondary };
  };

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: black
            ? 'poppins-black'
            : bold
            ? 'poppins-bold'
            : italic
            ? 'poppins-italic'
            : 'poppins',
          color: white ? 'white' : 'black',
          fontSize,
        },
        textColor(),
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};
