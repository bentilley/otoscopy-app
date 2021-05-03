/** @format */

import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

type Props = { onPress?: () => void };

/** Component for filling space around other components.
 *
 * @param onPress - Callback for when the spacer is pressed.
 */
export const Spacer: React.FC<Props> = ({ children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
      <View style={styles.spacer}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});
