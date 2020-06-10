/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OtoText } from 'components/design';

export const EmptyList: React.FC = () => {
  return (
    <View style={styles.container}>
      <OtoText size="medium" weight="semibold">
        You don't have any favourites yet...
      </OtoText>
      <OtoText size="small">
        Use the star to add slides to your favourites
      </OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});
