/** @format */

import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { OtoText, COLOURS } from "components/design";
import { LoginInput } from "components/UI";
import { ErrorMessage } from "components/Login/ErrorMessage";

type Props = {
  sendPasswordReset: (email: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
  goToLogin: () => void;
  goToResetSentSuccess: () => void;
};

export const ForgotPasswordForm: React.FC<Props> = ({
  sendPasswordReset,
  authErrorMsg,
  resetAuthError,
  goToLogin,
  goToResetSentSuccess,
}) => {
  const [email, setEmail] = React.useState("");
  return (
    <View>
      <View style={styles.inputContainer}>
        <OtoText size="medium" weight="semibold">
          Forgot Password
        </OtoText>
        <LoginInput
          accessibilityLabel="the email address you signed up with"
          reactState={[email, setEmail]}
          placeholder="the email address you signed up with"
          textContentType="emailAddress"
          onChangeText={() => (authErrorMsg ? resetAuthError() : null)}
        />
      </View>
      <ErrorMessage authErrorMsg={authErrorMsg} />
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="Send Password Reset"
            onPress={() => {
              sendPasswordReset(email);
              goToResetSentSuccess();
            }}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
