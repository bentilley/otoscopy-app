/** @format */

import React from "react";
import { View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { OtoText, COLOURS } from "components/design";
import { LoginInput } from "components/UI";
import { ErrorMessage } from "./ErrorMessage";

type Props = {
  createUser: (email: string, passwrod: string) => void;
  signInUser: (email: string, passwrod: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
  goToForgotPassword: () => void;
};

export const LoginForm: React.FC<Props> = ({
  createUser,
  signInUser,
  authErrorMsg,
  resetAuthError,
  goToForgotPassword,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View>
      <View style={styles.inputContainer}>
        <OtoText size="medium" weight="semibold">
          Login
        </OtoText>
        <LoginInput
          accessibilityLabel="your email address"
          reactState={[email, setEmail]}
          placeholder="email address"
          textContentType="emailAddress"
          onChangeText={() => (authErrorMsg ? resetAuthError() : null)}
        />
        <LoginInput
          accessibilityLabel="choose a password"
          reactState={[password, setPassword]}
          placeholder="password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={() => (authErrorMsg ? resetAuthError() : null)}
        />
      </View>
      <ErrorMessage authErrorMsg={authErrorMsg} />
      <View style={styles.buttonContainer}>
        <View style={styles.createUserContainer}>
          <Button
            accessibilityLabel="create user"
            title="Create User"
            onPress={() => createUser(email, password)}
            color={COLOURS.grey}
          />
        </View>
        <View style={styles.signInContainer}>
          <Button
            accessibilityLabel="sign in"
            title="Sign In"
            onPress={() => signInUser(email, password)}
            color={COLOURS.primary}
          />
          <TouchableOpacity
            accessibilityLabel="have you forgotten your password?"
            style={styles.forgotPasswordContainer}
            onPress={goToForgotPassword}>
            <OtoText size="small">forgot password?</OtoText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { paddingTop: 40 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createUserContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  signInContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  forgotPasswordContainer: {
    marginTop: 20,
  },
});
