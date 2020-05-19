/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OtoText, COLOURS, OtoIcon } from 'components/design';

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.icons}>
        <OtoText size="large">Star</OtoText>
        <OtoIcon name="star" />
      </View>
      <View style={styles.icons}>
        <OtoText size="large">Mag</OtoText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 75,
    backgroundColor: COLOURS.veryDark,
  },
  icons: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
