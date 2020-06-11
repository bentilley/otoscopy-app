/** @format */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ConditionSection } from 'model/condition/types';
import { OtoIcon, OtoText, COLOURS } from 'components/design';
import { shortHash } from 'utils';

function isList(info: ConditionSection): info is string[] {
  return (info as string[]).length !== undefined;
}

type Props = {
  information: ConditionSection;
};

export const InfoSection: React.FC<Props> = ({ information }) => {
  let body;
  if (isList(information)) {
    body = information.map((i) => <Bullet text={i} key={shortHash(i)} />);
  } else {
    body = Object.keys(information).map((k) => {
      const subsection = [];
      subsection.push(
        <SubTitle key={shortHash(k)}>{information[k].title}</SubTitle>,
      );
      information[k].information.forEach((i) => {
        subsection.push(<Bullet text={i} key={shortHash(i)} />);
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

const Bullet: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View style={bullet.container}>
      <View style={bullet.point}>
        <OtoIcon name="dash" size={5} color={COLOURS.grey} />
      </View>
      <View style={bullet.text}>
        <OtoText size="small">{text}</OtoText>
      </View>
    </View>
  );
};

const bullet = StyleSheet.create({
  container: { flexDirection: 'row', paddingVertical: 4 },
  point: { paddingHorizontal: 5, paddingVertical: 5 },
  text: { flex: 1, paddingRight: 25 },
});
