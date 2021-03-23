/** @format */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ConditionSection } from "model/condition/types";
import { OtoText, OtoIcon, COLOURS } from "components/design";
import { sectionMeta } from "./sections";
import { InfoSection } from "./InfoSection";

type Props = {
  information: ConditionSection | undefined;
  section: string;
};

export const Section: React.FC<Props> = ({ information, section }) => {
  if (!information) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <OtoIcon
          name={sectionMeta[section].icon}
          size={40}
          color={COLOURS.primaryDark}
        />
      </View>
      <View style={styles.text}>
        <View style={styles.title}>
          <OtoText size="medium" weight="semibold">
            <Text style={{ color: COLOURS.primaryDark }}>
              {sectionMeta[section].title}
            </Text>
          </OtoText>
        </View>
        <InfoSection information={information} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5,
    paddingTop: 10,
  },
  icon: { flex: 2, alignItems: "center", paddingTop: 5 },
  title: { paddingVertical: 8 },
  text: { flex: 8 },
});
