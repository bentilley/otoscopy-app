/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterIcon, FooterText } from 'components';
import { COLOURS } from 'components/design';

type Props = {
  goToFavourites: () => void;
};

export const ReferenceFooter: React.FC<Props> = ({ goToFavourites }) => {
  return (
    <Footer style={styles.footer}>
      <FooterText text="favourites" caret="L" onPress={goToFavourites} />
      <FooterIcon
        iconName="search"
        colour={COLOURS.grey}
        onPress={() => console.log('search')}
      />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
