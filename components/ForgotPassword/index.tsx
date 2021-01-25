/** @format */

import React from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { COLOURS } from "components/design";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

type Props = {
  sendPasswordReset: (email: string) => void;
  authErrorMsg: string | null;
  resetAuthError: () => void;
  goToLogin: () => void;
  goToResetSentSuccess: () => void;
};

export const ForgotPassword: React.FC<Props> = ({
  sendPasswordReset,
  authErrorMsg,
  resetAuthError,
  goToLogin,
  goToResetSentSuccess,
}) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.container, { width: 0.7 * windowWidth }]}>
          <ForgotPasswordForm
            sendPasswordReset={sendPasswordReset}
            authErrorMsg={authErrorMsg}
            resetAuthError={resetAuthError}
            goToLogin={goToLogin}
            goToResetSentSuccess={goToResetSentSuccess}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

// Other index exports
export { ResetSentSuccess } from "./ResetSentSuccess";
