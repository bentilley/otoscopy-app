/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OtoText } from 'components/design';

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <OtoText size="large" weight="bold">
        OtoApp
      </OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
