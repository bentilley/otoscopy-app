/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOURS } from 'components/design';
import { FooterIcon } from './icons';

/**
 * Footer
 * Component for the app to ensure consistent footer across views.
 * @param children - Components rendered in the footer, normally <FooterIcon />.
 */
export const Footer: React.FC = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
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

const TestFooter: React.FC = () => {
  return (
    <Footer>
      <FooterIcon iconName="star-o" colour={COLOURS.grey} onPress={() => {}} />
      <FooterIcon iconName="search" colour={COLOURS.grey} onPress={() => {}} />
    </Footer>
  );
};

export default TestFooter;
