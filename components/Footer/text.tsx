/** @format */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { OtoText, OtoIcon, COLOURS } from 'components/design';

interface Props {
  text: string;
  caret?: 'L' | 'R';
  onPress: () => void;
}

/**
 * FooterText
 * Footer to display when the slide has been diagnosed.
 * @param text - Text to display in the component.
 * @param caret - What type of caret the component should display.
 * @param onPress - Function to run when the component is pressed.
 */
export const FooterText: React.FC<Props> = ({ text, caret, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {caret === 'L' ? (
        <OtoIcon name="caret-left" size={30} color={COLOURS.grey} />
      ) : null}
      <OtoText size="medium" weight="semibold">
        {text}
      </OtoText>
      {caret === 'R' ? (
        <OtoIcon name="caret-right" size={30} color={COLOURS.grey} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
});
