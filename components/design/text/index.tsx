/** @format */

import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { OtoText } from "../OtoText";

export const TitleLogo: React.FC = () => {
  return (
    <View style={styles.titleLogo}>
      <Image
        source={require("../../../img/title-logo.png")}
        resizeMode="contain"
        style={styles.titleLogoImg}
      />
    </View>
  );
};

export const Title: React.FC = ({ children }) => {
  return (
    <View style={styles.title}>
      <OtoText size="large">{children}</OtoText>
    </View>
  );
};

export const Paragraph: React.FC = ({ children }) => {
  return (
    <View style={styles.paragraph}>
      <OtoText size="small">{children}</OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLogo: { flexDirection: "row", alignItems: "center", padding: 40 },
  titleLogoImg: { flex: 1 },
  title: {
    paddingVertical: 20,
  },
  paragraph: {
    paddingVertical: 10,
  },
});
