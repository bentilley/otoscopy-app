/** @format */

import React from 'react';
import { State } from './reducer';
import { Category, ConditionData } from './types';

export type Selectors = {
  getCategories: () => Category[];
  getCondition: (id: string) => ConditionData;
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
