/** @format */

import React from 'react';
import { ScrollView, StyleSheet, Button, View, Text } from 'react-native';
import { useCondition, Condition, ConditionSection } from 'model/condition';
import { Footer } from 'components';
import { OtoText, OtoIcon, COLOURS } from 'components/design';
import { conditionData } from './__mocks__/condition-data';

type Props = {
  goToSlides: () => void;
  condition: Condition;
};

type Sections =
  | 'otoscopy'
  | 'population'
  | 'risk_factors'
  | 'aetiology'
  | 'symptoms'
  | 'clinical_signs'
  | 'investigations'
  | 'audiology'
  | 'management'
  | 'complications';

const sections: Sections[] = [
  'otoscopy',
  'population',
  'risk_factors',
  'aetiology',
  'symptoms',
  'clinical_signs',
  'investigations',
  'audiology',
  'management',
  'complications',
];

const sectionMeta: { [index: string]: { title: string; icon: string } } = {
  otoscopy: { title: 'Otoscopy', icon: 'otoscope' },
  population: { title: 'Population', icon: 'population' },
  risk_factors: { title: 'Risk Factors', icon: 'risks' },
  aetiology: { title: 'Aetiology', icon: 'causes' },
  symptoms: { title: 'Symptoms', icon: 'star-o' },
  clinical_signs: { title: 'Clinical Signs', icon: 'star-o' },
  investigations: { title: 'Investogations', icon: 'star-o' },
  audiology: { title: 'Audiology', icon: 'star-o' },
  management: { title: 'Management', icon: 'star-o' },
  complications: { title: 'Complications', icon: 'star-o' },
};

const ConditionView: React.FC<Props> = ({ goToSlides, condition }) => {
  /* const { info } = useCondition(condition.id); */
  const info = conditionData;

  return (
    <React.Fragment>
      {info ? (
        <ScrollView style={styles.screen}>
          <Description>{info.description}</Description>
          {sections.map((section) => (
            <FactSheetSection
              information={info[section]}
              key={section}
              section={section}
            />
          ))}
          <Button title="View Slides" onPress={goToSlides} />
          <OtoIcon name="otoscope" size={30} />
        </ScrollView>
      ) : (
        <View>
          <OtoText size="medium">Loading...</OtoText>
        </View>
      )}
      <Footer />
    </React.Fragment>
  );
};

const Description: React.FC = ({ children }) => {
  return (
    <View style={styles.description}>
      <OtoText size="medium">{children}</OtoText>
    </View>
  );
};

type FactSheetSectionProps = {
  information: ConditionSection;
  section: string;
};

const FactSheetSection: React.FC<FactSheetSectionProps> = ({
  information,
  section,
}) => {
  // TODO add weight to the sectino titles once added to OtoText
  return (
    <View style={styles.factSheetSection}>
      <View style={styles.factSheetSectionIcon}>
        <OtoIcon
          name={sectionMeta[section].icon}
          size={40}
          style={{ color: COLOURS.primaryDark }}
        />
      </View>
      <View style={styles.factSheetSectionText}>
        <View style={styles.factSheetSectionTitle}>
          <OtoText size="medium">
            <Text style={{ color: COLOURS.primaryDark }}>
              {sectionMeta[section].title}
            </Text>
          </OtoText>
        </View>
        <SectonInfo information={information} />
      </View>
    </View>
  );
};

type SectionInfoProps = {
  information: ConditionSection;
};

function isList(info: ConditionSection): info is string[] {
  return (info as string[]).length !== undefined;
}

const SectonInfo: React.FC<SectionInfoProps> = ({ information }) => {
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

// TODO find a better place for this to live (start a utils)
function shortHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const Bullet: React.FC<{ text: string }> = ({ text }) => {
  // TODO make the bullet a proper nice bullet
  return (
    <View style={styles.factSheetSectionBullet}>
      <OtoText size="small">-- {text}</OtoText>
    </View>
  );
};

const SubTitle: React.FC = ({ children }) => {
  // TODO stick this font weight on OtoText
  return (
    <View style={styles.factSheetSectionSubSectionTitle}>
      <OtoText size="small">
        <Text style={{ fontWeight: '700' }}>{children}</Text>
      </OtoText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLOURS.black },
  description: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  factSheetSection: { flex: 1, flexDirection: 'row', paddingVertical: 5 },
  factSheetSectionIcon: { flex: 2, alignItems: 'center', paddingTop: 5 },
  factSheetSectionText: { flex: 9 },
  factSheetSectionTitle: {},
  factSheetSectionInfo: {},
  factSheetSectionBullet: { paddingVertical: 3 },
  factSheetSectionSubSectionTitle: { paddingTop: 10, paddingBottom: 5 },
});

export default ConditionView;
