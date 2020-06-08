/** @format */

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { OtoText, COLOURS } from 'components/design';
import { LoginInput } from './LoginInput';
import { ErrorMessage } from './ErrorMessage';

type Props = {
  createUser: (email: string, passwrod: string) => void;
  loginUser: (email: string, passwrod: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
};

export const LoginForm: React.FC<Props> = ({
  createUser,
  loginUser,
  authErrorMsg,
  resetAuthError,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View>
      <View style={styles.inputContainer}>
        <OtoText size="medium" weight="semibold">
          Login
        </OtoText>
        <LoginInput
          reactState={[email, setEmail]}
          placeholder="email address"
          textContentType="emailAddress"
          onChangeText={() => (authErrorMsg ? resetAuthError() : null)}
        />
        <LoginInput
          reactState={[password, setPassword]}
          placeholder="password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={() => (authErrorMsg ? resetAuthError() : null)}
        />
      </View>
      <ErrorMessage authErrorMsg={authErrorMsg} />
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Create User"
            onPress={() => createUser(email, password)}
            color={COLOURS.grey}
          />
        </View>
        <View>
          <Button
            title="Sign In"
            onPress={() => loginUser(email, password)}
            color={COLOURS.primary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { paddingTop: 40 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
