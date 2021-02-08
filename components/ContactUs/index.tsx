/** @format */

import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { COLOURS } from "components/design";
import { FeedbackForm } from "./FeedbackForm";
import { FeedbackSuccess } from "./FeedbackSuccess";

type Props = {
  goToMenu: () => void;
  submitFeedback: (msg: string) => void;
};

export const ContactUs: React.FC<Props> = ({ goToMenu, submitFeedback }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.screen]}>
        {!feedbackSubmitted ? (
          <FeedbackForm
            submitFeedback={(msg: string) => {
              submitFeedback(msg);
              setFeedbackSubmitted(true);
            }}
          />
        ) : (
          <FeedbackSuccess
            goToMenu={goToMenu}
            resetForm={() => setFeedbackSubmitted(false)}
          />
        )}
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
});
