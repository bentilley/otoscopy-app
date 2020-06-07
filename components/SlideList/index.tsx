/** @format */

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { COLOURS } from 'components/design';
import { Slide } from 'model/condition/types';
import { Footer, FooterText } from 'components/Footer';
import SlideListItem from './SlideListItem';
import FavouriteSlideListItem from './FavouriteSlideListItem';

type Props = {
  slides: Slide[];
  isFavourites: boolean;
  goToSlide: (slide: Slide) => void;
};

const SlideList: React.FC<Props> = ({ slides, isFavourites, goToSlide }) => {
  const ListItem = isFavourites ? FavouriteSlideListItem : SlideListItem;
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <FlatList
          data={slides}
          keyExtractor={(item) => item.thumbnail_url}
          renderItem={({ item: slide }) => (
            <ListItem slide={slide} onPress={() => goToSlide(slide)} />
          )}
        />
      </View>
      <Footer>
        <FooterText text="TODO" onPress={() => {}} />
      </Footer>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'stretch', backgroundColor: COLOURS.veryDark },
});

export default SlideList;
