/** @format */

import React from 'react';
import { State } from './reducer';
import { Category, Condition, Slide } from './types';

export type Selectors = {
  getCategories: () => Category[];
  getCondition: (id: string) => Condition;
};

const useSelectors = (state: State): Selectors => {
  return React.useMemo(
    () => ({
      getCategories: () => state.categories,
      getCondition: (conditionId: string) => state.conditions[conditionId],
    }),
    [state],
  );
};

export default useSelectors;
