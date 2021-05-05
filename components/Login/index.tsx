/** @format */

import React from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { COLOURS } from "components/design";
import { LoginForm } from "./LoginForm";
import { TitleLogo } from "components/design";

type Props = {
  signInUser: (email: string, password: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
  goToSignUp: () => void;
  goToForgotPassword: () => void;
};

export const Login: React.FC<Props> = ({
  signInUser,
  authErrorMsg,
  resetAuthError,
  goToSignUp,
  goToForgotPassword,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.container]}>
          <TitleLogo />
          <View style={styles.formContainer}>
            <LoginForm
              createUser={goToSignUp}
              signInUser={signInUser}
              authErrorMsg={authErrorMsg}
              resetAuthError={resetAuthError}
              goToForgotPassword={goToForgotPassword}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: COLOURS.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: { width: "70%" },
});
