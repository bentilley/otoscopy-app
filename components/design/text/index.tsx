/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { OtoText } from "../OtoText";

export const Title: React.FC = ({ children }) => {
  return (
    <View style={style.title}>
      <OtoText size="large">{children}</OtoText>
    </View>
  );
};

export const Paragraph: React.FC = ({ children }) => {
  return (
    <View style={style.paragraph}>
      <OtoText size="small">{children}</OtoText>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    paddingVertical: 20,
  },
  paragraph: {
    paddingVertical: 10,
  },
});
