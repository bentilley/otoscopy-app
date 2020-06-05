/** @format */

import React from 'react';
import { State } from './reducer';
import { Category, Condition, Slide } from './types';

export type Selectors = {
  getCategories: () => Category[];
  getCondition: (id: string) => Condition;
  getSlidesForCondition: (conditionId: string) => Slide[];
};

const useSelectors = (state: State): Selectors => {
  return React.useMemo(
    () => ({
      getCategories: () => state.categories,
      getCondition: (conditionId: string) => state.conditions[conditionId],
      getSlidesForCondition: (conditionId: string) =>
        state.slides.filter((slide) => slide.conditionId === conditionId),
    }),
    [state],
  );
};

export default useSelectors;
