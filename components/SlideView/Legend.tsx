/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { OtoText, COLOURS } from "components/design";
import { Text } from "react-native";

type Props = {
  legend: { [index: string]: string };
};

/** Legend
 *
 * The legend for the overlay of a slide.
 *
 * @param legend - the legend data.
 */
export const Legend: React.FC<Props> = ({ legend }) => {
  return (
    <View>
      {Object.entries(legend).map(([label, text]) => (
        <LegendItem key={label} label={label} text={text} />
      ))}
    </View>
  );
};

const LegendItem: React.FC<{ label: string; text: string }> = ({
  label,
  text,
}) => {
  return (
    <View style={style.container}>
      <View style={style.label}>
        <OtoText size="large" weight="semibold">
          <Text style={style.labelText}>{label}</Text>
        </OtoText>
      </View>
      <View style={style.text}>
        <OtoText size="medium">{text}</OtoText>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  labelText: {
    color: COLOURS.primary,
  },
  text: {
    flex: 5,
  },
});
