/** @format */

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { OtoText, COLOURS } from 'components/design';
import { LoginInput } from 'components/Login/LoginInput';
import { ErrorMessage } from 'components/Login/ErrorMessage';

type Props = {
  createUser: (email: string, password: string, position: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
  goToLogin: () => void;
};

export const SignUpForm: React.FC<Props> = ({
  createUser,
  authErrorMsg,
  resetAuthError,
  goToLogin,
}) => {
  const [email, setEmail] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View>
      <View style={styles.inputContainer}>
        <OtoText size="medium" weight="semibold">
          Sign Up
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
        <LoginInput
          reactState={[position, setPosition]}
          placeholder="current position e.g. Junior Doctor"
          textContentType="none"
          onChangeText={() => (authErrorMsg ? resetAuthError() : null)}
        />
        <View style={styles.notRequired}>
          <OtoText size="small">*not required</OtoText>
        </View>
      </View>
      <ErrorMessage authErrorMsg={authErrorMsg} />
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Create User"
            onPress={() => createUser(email, password, position)}
            color={COLOURS.primary}
          />
        </View>
        <View>
          <Button title="Cancel" onPress={goToLogin} color={COLOURS.grey} />
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
  notRequired: { marginTop: 5 },
});
