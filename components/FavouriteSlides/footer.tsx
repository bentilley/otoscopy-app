/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterText } from 'components/Footer';

interface Props {
  studyFavourites: () => void;
}

/**
 * FavouriteSlidesFooter
 * Footer to display for list of favourite slides.
 * @param studyFavourites - Navigate the app to the SlideView with favourites.
 */
export const FavouriteSlidesFooter: React.FC<Props> = ({ studyFavourites }) => {
  return (
    <Footer style={styles.footer}>
      <FooterText text="study all" onPress={studyFavourites} />
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
});
