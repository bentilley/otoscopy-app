/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterText } from 'components/Footer';

interface Props {
  goToStudySlides: () => void;
}

/**
 * ConditionSlidesFooter
 * Footer to display for list of condition slides.
 * @param goToStudySlides - Navigate to SlideView with all condition slides.
 */
export const ConditionSlidesFooter: React.FC<Props> = ({ goToStudySlides }) => {
  return (
    <Footer style={styles.footer}>
      <FooterText text="study" onPress={goToStudySlides} />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
});
