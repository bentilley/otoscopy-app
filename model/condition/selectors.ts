/** @format */

import React from 'react';
import { State } from './reducer';
import { Category, Condition, Slide } from './types';
import { getRandomInt } from 'utils';

export type Selectors = {
  getCategories: () => Category[];
  getCondition: (id: string) => Condition;
  getSlidesForCondition: (conditionId: string) => Slide[];
  isFavourite: (slideId: string) => boolean;
  getFavourites: () => { [slideId: string]: Slide };
  getRandomSlide: () => Slide;
};

const useSelectors = (state: State): Selectors => {
  return React.useMemo(
    () => ({
      getCategories: () => state.categories,
      getCondition: (conditionId: string) => state.conditions[conditionId],
      getSlidesForCondition: (conditionId: string) =>
        Object.values(state.slides).filter(
          (slide) => slide.conditionId === conditionId,
        ),
      isFavourite: (slideId: string) => !!state.favourites[slideId],
      getFavourites: () => state.favourites,
      getRandomSlide: () => {
        const slideArray = Object.values(state.slides);
        return slideArray[getRandomInt(slideArray.length)];
      },
    }),
    [state],
  );
};

export default useSelectors;
