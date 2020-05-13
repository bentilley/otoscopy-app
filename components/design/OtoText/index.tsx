/** @format */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

type OtoTextProps = {
  size: 'small' | 'medium' | 'large';
};

export const OtoText: React.FC<OtoTextProps> = ({ children, size }) => {
  switch (size) {
    case 'small':
      return <SmallText>{children}</SmallText>;
    case 'medium':
      return <MediumText>{children}</MediumText>;
    case 'large':
      return <LargeText>{children}</LargeText>;
  }
};

const AppText: React.FC = ({ children }) => {
  return <Text style={style.font}>{children}</Text>;
};

const LargeText: React.FC = ({ children }) => {
  return (
    <AppText>
      <Text style={style.largeFont}>{children}</Text>
    </AppText>
  );
};

const MediumText: React.FC = ({ children }) => {
  return (
    <AppText>
      <Text style={style.mediumFont}>{children}</Text>
    </AppText>
  );
};

const SmallText: React.FC = ({ children }) => {
  return (
    <AppText>
      <Text style={style.smallFont}>{children}</Text>
    </AppText>
  );
};

const style = StyleSheet.create({
  font: {
    color: '#dedede',
  },
  largeFont: { fontSize: 24 },
  mediumFont: { fontSize: 18 },
  smallFont: { fontSize: 14 },
});
