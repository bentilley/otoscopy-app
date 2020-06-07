/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterText } from 'components/Footer';

type Props = {
  goToSlides: () => void;
};

export const ConditionViewFooter: React.FC<Props> = ({ goToSlides }) => {
  return (
    <Footer style={styles.footer}>
      <FooterText text="view slides" caret="R" onPress={goToSlides} />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: { justifyContent: 'flex-end', paddingHorizontal: 20 },
});
