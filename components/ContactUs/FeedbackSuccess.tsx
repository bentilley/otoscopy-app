/** @format */

import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Title, Paragraph } from "components/design";

type Props = {
  goToMenu: () => void;
  resetForm: () => void;
};

export const FeedbackSuccess: React.FC<Props> = ({ goToMenu, resetForm }) => {
  return (
    <View style={styles.container}>
      <Title>Success!</Title>
      <Paragraph>Thank you for your feedback!</Paragraph>
      <Paragraph>
        Use the space below for any questions or comments, or just drop us a
        note to say hello!
      </Paragraph>
      <View>
        <Button title="Contact Again!" onPress={resetForm} />
        <Button title="Back to Menu" onPress={goToMenu} />
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
});
