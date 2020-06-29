/** @format */

import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Slide } from 'model/condition/types';
import { ListItem } from './ListItem';
import { FavouriteSlidesFooter } from './footer';
import { SlideList } from 'components/UI/SlideList';

type Props = {
  slides: { [slideId: string]: Slide };
  goToSlide: (slide: Slide) => void;
  studyFavourites: () => void;
};

/**
 * FavouriteSlides
 * A component to display a list of favourited slides.
 * @param slides - an array of slides to display;
 * @param goToSlide - navigate the app to a specific slide;
 * @param studyFavourites - navigate the app to SlideView with favourite slides.
 */
export const FavouriteSlides: React.FC<Props> = ({
  slides,
  goToSlide,
  studyFavourites,
}) => {
  const width = useWindowDimensions().width;
  const slideArray = Object.values(slides);
  return (
    <SlideList
      slideArray={slideArray}
      renderItem={({ item: slide }) => (
        <ListItem
          width={width}
          slide={slide}
          onPress={() => goToSlide(slide)}
        />
      )}
      footer={<FavouriteSlidesFooter studyFavourites={studyFavourites} />}
    />
  );
};
