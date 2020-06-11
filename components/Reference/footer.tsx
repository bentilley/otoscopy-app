/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterIcon, FooterText } from 'components/Footer';
import { COLOURS } from 'components/design';

type Props = {
  goToFavourites: () => void;
};

// TODO Add search feature to the category reference page
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
