/** @format */

import React from 'react';
import { ScrollView, StyleSheet, Button, View } from 'react-native';
import { useCondition, Condition } from 'model/condition';
import { Footer } from 'components';
import { OtoText, COLOURS } from 'components/design';
import { conditionData } from './__mocks__/condition-data';
import Section from './Section';
import { sections } from './sections';

type Props = {
  goToSlides: () => void;
  condition: Condition;
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
            <Section
              information={info[section]}
              key={section}
              section={section}
            />
          ))}
          <Button title="View Slides" onPress={goToSlides} />
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
      <OtoText size="smallMedium" weight="semibold">
        {children}
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
    paddingTop: 30,
    paddingBottom: 10,
  },
});

export default ConditionView;
