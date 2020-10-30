import React from 'react';
import { Text } from 'react-native';
import * as ds from '../../constants/styles';

export const PoppinsText = (props) => {
  const { black, bold, italic, white, fontSize = ds.fontSize[0] } = props;

  const textColor = () => {
    if (props.white) return { color: ds.white };
    if (props.primary) return { color: ds.primary };
    if (props.accent) return { color: ds.accent };
    if (props.accentSecondary) return { color: ds.accentSecondary };
    if (props.secondary) return { color: ds.secondary };
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
