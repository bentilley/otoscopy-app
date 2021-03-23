/** @format */

import React from "react";
import { StyleSheet, Text } from "react-native";

import { OtoText, FontSizes } from "../OtoText";
import { useLinkHandler } from "./useLinkHandler";
import { COLOURS } from "components/design/colours";

type Props = {
  size: FontSizes;
  children: string;
  url: string;
};

export const OtoLink: React.FC<Props> = ({ children, url, size }) => {
  const handlePress = useLinkHandler(url);
  return (
    <OtoText size={size} weight="bold">
      <Text style={style.linkText} onPress={handlePress}>
        {children}
      </Text>
    </OtoText>
  );
};

const style = StyleSheet.create({
  linkText: {
    color: COLOURS.primary,
    textDecorationLine: "underline",
  },
});
