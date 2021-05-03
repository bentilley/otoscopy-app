/** @format */

import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLOURS } from "components/design/colours";

type OtoTextProps = {
  size: FontSizes;
  weight?: FontWeights;
  align?: TextAlign;
};

export const OtoText: React.FC<OtoTextProps> = ({
  children,
  size,
  weight,
  align,
}) => {
  const stylesheet = getStyleSheet(size, weight, align);
  return (
    <AppText>
      <Text style={stylesheet.style}>{children}</Text>
    </AppText>
  );
};

const AppText: React.FC = ({ children }) => {
  return <Text style={style.font}>{children}</Text>;
};

export type FontSizes = "large" | "medium" | "smallMedium" | "small";
export type FontWeights = "fine" | "normal" | "semibold" | "bold";
export type TextAlign = "left" | "right" | "center";

function getStyleSheet(
  fontSize: FontSizes,
  fontWeight: FontWeights | undefined,
  textAlign: TextAlign | undefined,
) {
  return StyleSheet.create({
    style: {
      fontSize: size[fontSize],
      fontWeight: weight[fontWeight || "normal"],
      textAlign,
    },
  });
}

const size: { [key in FontSizes]: number } = {
  large: 24,
  medium: 18,
  smallMedium: 16,
  small: 14,
};

const weight: { [key in FontWeights]: "100" | "300" | "500" | "700" } = {
  fine: "100",
  normal: "300",
  semibold: "500",
  bold: "700",
};

const style = StyleSheet.create({
  font: {
    color: COLOURS.lightGrey,
  },
  largeFont: { fontSize: 24 },
  mediumFont: { fontSize: 18 },
  smallMedFont: { fontSize: 16 },
  smallFont: { fontSize: 14 },
});
