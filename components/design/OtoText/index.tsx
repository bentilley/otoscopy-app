/** @format */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLOURS } from 'components/design/colours';

type OtoTextProps = {
  size: FontSizes;
  weight?: FontWeights;
};

export const OtoText: React.FC<OtoTextProps> = ({ children, size, weight }) => {
  const stylesheet = getStyleSheet(size, weight);
  return (
    <AppText>
      <Text style={stylesheet.style}>{children}</Text>
    </AppText>
  );
};

const AppText: React.FC = ({ children }) => {
  return <Text style={style.font}>{children}</Text>;
};

type FontSizes = 'large' | 'medium' | 'smallMedium' | 'small';
type FontWeights = 'fine' | 'normal' | 'semibold' | 'bold';

function getStyleSheet(
  fontSize: FontSizes,
  fontWeight: FontWeights | undefined,
) {
  return StyleSheet.create({
    style: {
      fontSize: size[fontSize],
      fontWeight: weight[fontWeight || 'normal'],
    },
  });
}

const size: { [key in FontSizes]: number } = {
  large: 24,
  medium: 18,
  smallMedium: 16,
  small: 14,
};

const weight: { [key in FontWeights]: '100' | '300' | '500' | '700' } = {
  fine: '100',
  normal: '300',
  semibold: '500',
  bold: '700',
};

const style = StyleSheet.create({
  font: {
    color: COLOURS.lightGrey,
  },
  largeFont: { fontSize: 24 },
  mediumFont: { fontSize: 18 },
  smallMedFont: { fontSize: 16 },
  smallFont: { fontSize: 14 },
});
