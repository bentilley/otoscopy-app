/** @format */

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLOURS } from 'components/design';

type Props = {
  reactState: [string, React.Dispatch<React.SetStateAction<string>>];
  placeholder: string;
  textContentType: 'emailAddress' | 'password';
  secureTextEntry?: boolean;
  onChangeText: () => void;
};

export const LoginInput: React.FC<Props> = ({
  reactState,
  onChangeText,
  placeholder,
  secureTextEntry,
  textContentType,
}) => {
  const [value, setValue] = reactState;
  return (
    <TextInput
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
