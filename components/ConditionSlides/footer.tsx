/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterText } from 'components/Footer';

interface Props {
  goToCondition: () => void;
}

/**
 * ConditionSlidesFooter
 * Footer to display for list of condition slides.
 * @param goToCondition - Navigate the app to the condition view.
 */
export const ConditionSlidesFooter: React.FC<Props> = ({ goToCondition }) => {
  return (
    <Footer style={styles.footer}>
      <FooterText text="see condition" onPress={goToCondition} />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
});
