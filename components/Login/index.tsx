/** @format */

import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLOURS } from 'components/design';
import { LoginForm } from './LoginForm';
import { Header } from './Header';

type Props = {
  createUser: (email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
};

export const Login: React.FC<Props> = ({
  createUser,
  loginUser,
  authErrorMsg,
  resetAuthError,
}) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, { width: 0.7 * windowWidth }]}>
          <Header />
          <LoginForm
            createUser={createUser}
            loginUser={loginUser}
            authErrorMsg={authErrorMsg}
            resetAuthError={resetAuthError}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.black,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
