/** @format */

import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { Title, Paragraph, COLOURS } from "components/design";

type Props = {
  submitFeedback: (msg: string) => void;
};

export const FeedbackForm: React.FC<Props> = ({ submitFeedback }) => {
  const [comment, setComment] = React.useState("");
  return (
    <View style={styles.container}>
      <Title>Contact Us</Title>
      <Paragraph>
        We love to hear feedback about the app - good and not so good - so that
        we can continue to improve OtoApp.
      </Paragraph>
      <Paragraph>
        Use the space below for any questions or comments, or just drop us a
        note to say hello!
      </Paragraph>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder={"Type your message here!"}
          placeholderTextColor={COLOURS.darkGrey}
          value={comment}
          onChangeText={setComment}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Send" onPress={() => submitFeedback(comment)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  inputContainer: {
    flex: 5,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    color: COLOURS.lightGrey,
    borderColor: COLOURS.dark,
    borderWidth: 1,
    backgroundColor: COLOURS.veryDark,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
