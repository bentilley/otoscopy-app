/** @format */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLOURS } from 'components/design';

interface Props {
  children: Element;
  style?: ViewStyle;
}

/**
 * Footer
 * Component for the app to ensure consistent footer across views.
 * @param children - Components rendered in the footer, normally <FooterIcon />.
 */
export const Footer: React.FC<Props> = ({ children, style }) => {
  const mergedStyles = style ? [styles.footer, style] : styles.footer;
  return <View style={mergedStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 70,
    backgroundColor: COLOURS.veryDark,
    borderTopWidth: 1,
    borderTopColor: COLOURS.dark,
  },
  icons: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export { FooterIcon } from './icons';
export { FooterText } from './text';
