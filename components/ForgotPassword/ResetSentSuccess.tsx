/** @format */

import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Title, Paragraph, COLOURS } from "components/design";

type Props = {
  goToLogin: () => void;
};

export const ResetSentSuccess: React.FC<Props> = ({ goToLogin }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        <View style={styles.container}>
          <Title>Please check your emails</Title>
          <Paragraph>
            If your email address exists on our system, we have sent you a
            password reset email. If you don't see it, don't forget to check
            your junk folder!
          </Paragraph>
          <View style={styles.buttonContainer}>
            <Button
              title="Back to login"
              onPress={goToLogin}
              color={COLOURS.primary}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: COLOURS.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
