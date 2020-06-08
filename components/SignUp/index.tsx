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
import { SignUpForm } from './SignUpForm';

type Props = {
  createUser: (email: string, password: string, position: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
  goToLogin: () => void;
};

export const SignUp: React.FC<Props> = ({
  createUser,
  authErrorMsg,
  resetAuthError,
  goToLogin,
}) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, { width: 0.7 * windowWidth }]}>
          <SignUpForm
            createUser={createUser}
            goToLogin={goToLogin}
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
