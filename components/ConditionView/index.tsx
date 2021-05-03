/** @format */

import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Condition } from "model/condition/types";
import { OtoText, COLOURS } from "components/design";
import { Section } from "./Section";
import { sections } from "./sections";
import { ConditionViewFooter } from "./footer";

type Props = {
  goToSlides: () => void;
  condition: Condition | null;
};

const ConditionView: React.FC<Props> = ({ goToSlides, condition }) => {
  return (
    <React.Fragment>
      {condition ? (
        <View style={styles.screen} testID="condition-view-screen">
          <ScrollView>
            <Description>{condition.description}</Description>
            {sections.map((section) => (
              <Section
                information={condition[section]}
                key={section}
                section={section}
              />
            ))}
          </ScrollView>
          <ConditionViewFooter goToSlides={goToSlides} />
        </View>
      ) : (
        <LoadingView />
      )}
    </React.Fragment>
  );
};

const LoadingView = () => {
  return (
    <View style={[styles.screen, styles.loading]}>
      <OtoText size="medium">Loading...</OtoText>
    </View>
  );
};

const Description: React.FC = ({ children }) => {
  return (
    <View style={styles.description}>
      <OtoText size="smallMedium" weight="semibold" align="center">
        {children}
      </OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLOURS.black },
  description: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  loading: { justifyContent: "center", alignItems: "center" },
});

export default ConditionView;
