/** @format */

import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLOURS } from "components/design";

type Props = {
  accessibilityLabel: string;
  reactState: [string, React.Dispatch<React.SetStateAction<string>>];
  placeholder: string;
  textContentType: "emailAddress" | "password" | "none";
  secureTextEntry?: boolean;
  onChangeText: () => void;
};

export const LoginInput: React.FC<Props> = ({
  accessibilityLabel,
  reactState,
  onChangeText,
  placeholder,
  secureTextEntry,
  textContentType,
}) => {
  const [value, setValue] = reactState;
  return (
    <TextInput
      accessibilityLabel={accessibilityLabel}
      value={value}
      style={styles.input}
      placeholder={placeholder}
      textContentType={textContentType}
      autoCapitalize="none"
      secureTextEntry={!!secureTextEntry}
      placeholderTextColor={COLOURS.darkGrey}
      onChangeText={(text) => {
        setValue(text);
        onChangeText();
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLOURS.dark,
    color: COLOURS.grey,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
