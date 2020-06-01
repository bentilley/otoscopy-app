/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOURS, OtoIcon } from 'components/design';

export const Footer: React.FC = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
      <View style={styles.icons}>
        <OtoIcon name="star-o" size={40} style={{ color: COLOURS.grey }} />
      </View>
      <View style={styles.icons}>
        <OtoIcon name="search" size={50} style={{ color: COLOURS.grey }} />
      </View>
    </Footer>
  );
};

export default TestFooter;
