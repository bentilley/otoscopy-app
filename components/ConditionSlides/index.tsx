/** @format */

import React from 'react';
import { Slide } from 'model/condition/types';
import { ListItem } from './ListItem';
import { ConditionSlidesFooter } from './footer';
import { SlideList } from 'components/UI/SlideList';

type Props = {
  slides: { [slideId: string]: Slide };
  goToSlide: (slide: Slide) => void;
  goToCondition: () => void;
};

export const ConditionSlides: React.FC<Props> = ({
  slides,
  goToSlide,
  goToCondition,
}) => {
  const slideArray = Object.values(slides);
  return (
    <SlideList
      slideArray={slideArray}
      renderItem={({ item: slide }) => (
        <ListItem slide={slide} onPress={() => goToSlide(slide)} />
      )}
      footer={<ConditionSlidesFooter goToCondition={goToCondition} />}
    />
  );
};
