/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";

import { ConditionSection, InfoLink } from "model/condition/types";
import { OtoIcon, OtoText, OtoLink, COLOURS } from "components/design";
import { shortHash, isList, toStr, isInfoLink } from "utils";

type Props = {
  information: ConditionSection;
};

export const InfoSection: React.FC<Props> = ({ information }) => {
  let body;
  if (isList(information)) {
    body = information.map((i) => (
      <SectionBullet text={i} key={shortHash(toStr(i))} />
    ));
  } else {
    body = Object.keys(information).map((k) => {
      const subsection = [];
      subsection.push(
        <SubTitle key={shortHash(k)}>{information[k].title}</SubTitle>,
      );
      information[k].information.forEach((i) => {
        subsection.push(<SectionBullet text={i} key={shortHash(toStr(i))} />);
      });
      return subsection;
    });
  }
  return <View style={styles.factSheetSectionInfo}>{body}</View>;
};

const SubTitle: React.FC = ({ children }) => {
  return (
    <View style={styles.factSheetSectionSubSectionTitle}>
      <OtoText size="small" weight="semibold">
        {children}
      </OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  factSheetSectionInfo: {},
  factSheetSectionSubSectionTitle: { paddingTop: 10, paddingBottom: 5 },
});

const Bullet: React.FC<{ icon?: string }> = ({ icon, children }) => {
  return (
    <View style={bullet.container}>
      <View style={bullet.point}>
        <OtoIcon name={icon || "dash"} size={5} color={COLOURS.grey} />
      </View>
      <View style={bullet.text}>{children}</View>
    </View>
  );
};

const SectionBullet: React.FC<{ text: string | InfoLink }> = ({ text }) => {
  if (isInfoLink(text)) {
    return (
      <Bullet>
        <OtoLink size="small" url={text.url}>
          {text.text}
        </OtoLink>
      </Bullet>
    );
  } else {
    return (
      <Bullet>
        <OtoText size="small">{text}</OtoText>
      </Bullet>
    );
  }
};

const bullet = StyleSheet.create({
  container: { flexDirection: "row", paddingVertical: 4 },
  point: { paddingHorizontal: 5, paddingVertical: 5 },
  text: { flex: 1, paddingRight: 25 },
});
