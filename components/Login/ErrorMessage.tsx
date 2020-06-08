/** @format */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OtoText, COLOURS } from 'components/design';

interface Props {
  authErrorMsg: string | null;
}

export const ErrorMessage: React.FC<Props> = ({ authErrorMsg }) => {
  return (
    <View style={styles.container}>
      <OtoText size="small" weight="semibold">
        <Text style={{ color: COLOURS.error }}>{authErrorMsg || ''}</Text>
      </OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 56, paddingVertical: 20 },
});
