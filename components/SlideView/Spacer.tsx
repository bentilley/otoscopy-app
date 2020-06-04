/** @format */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { OtoText } from 'components/design';

type Props = { text?: string; onPress?: () => void };

/**
 * Spacer
 * Component for filling space around other components.
 * @param text - Text to display in the spacer (center aligned).
 * @param onPress - Callback for when the spacer is pressed.
 */
export const Spacer: React.FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
      <View style={styles.spacer}>
        {text ? (
          <OtoText size="large" weight="bold">
            {text}
          </OtoText>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  spacer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
