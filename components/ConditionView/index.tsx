/** @format */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Condition } from 'model/condition/types';
import { OtoText, COLOURS } from 'components/design';
import { Section } from './Section';
import { sections } from './sections';
import { ConditionViewFooter } from './footer';

type Props = {
  goToSlides: () => void;
  condition: Condition;
};

const ConditionView: React.FC<Props> = ({ goToSlides, condition }) => {
  return (
    <React.Fragment>
      {condition ? (
        <React.Fragment>
          <ScrollView style={styles.screen}>
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
        </React.Fragment>
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
  loading: { justifyContent: 'center', alignItems: 'center' },
});

export default ConditionView;
