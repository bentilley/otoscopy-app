/** @format */

import React from 'react';
import { Slide } from 'model/condition/types';
import { ListItem } from './ListItem';
import { FavouriteSlidesFooter } from './footer';
import { SlideList } from 'components/UI/SlideList';

type Props = {
  slides: { [slideId: string]: Slide };
  goToSlide: (slide: Slide) => void;
  studyFavourites: () => void;
};

export const FavouriteSlides: React.FC<Props> = ({
  slides,
  goToSlide,
  studyFavourites,
}) => {
  const slideArray = Object.values(slides);
  return (
    <SlideList
      slideArray={slideArray}
      renderItem={({ item: slide }) => (
        <ListItem slide={slide} onPress={() => goToSlide(slide)} />
      )}
      footer={<FavouriteSlidesFooter studyFavourites={studyFavourites} />}
    />
  );
};
