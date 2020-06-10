/** @format */

import React from 'react';
import { State } from './reducer';
import { Category, ConditionHead, Condition, Slide } from './types';
import { getRandomInt } from 'utils';

export type Selectors = {
  getCategories: () => Category[];
  getSlides: () => { [slideId: string]: Slide };
  getSlidesArray: () => Slide[];
  getCondition: (id: string) => Condition;
  getSlidesForCondition: (conditionId: string) => { [slideId: string]: Slide };
  isFavourite: (slideId: string) => boolean;
  getFavourites: () => { [slideId: string]: Slide };
  getRandomSlide: () => Slide;
  getRandomCondition: () => ConditionHead;
};

const useSelectors = (state: State): Selectors => {
  return React.useMemo(
    () => ({
      getCategories: () => state.categories,
      getSlides: () => state.slides,
      getSlidesArray: () => Object.values(state.slides),
      getCondition: (conditionId: string) => state.conditions[conditionId],
      getSlidesForCondition: (conditionId: string) =>
        Object.fromEntries(
          Object.entries(state.slides).filter(
            (entry) => entry[1].conditionId === conditionId,
          ),
        ),
      isFavourite: (slideId: string) => !!state.favourites[slideId],
      getFavourites: () => state.favourites,
      getRandomSlide: () => {
        const slideArray = Object.values(state.slides);
        return slideArray[getRandomInt(slideArray.length)];
      },
      getRandomCondition: () => {
        const category =
          state.categories[getRandomInt(state.categories.length)];
        return category.conditions[getRandomInt(category.conditions.length)];
      },
    }),
    [state],
  );
};

export default useSelectors;
