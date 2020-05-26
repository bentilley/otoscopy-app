/** @format */

import React from 'react';
import { Category, Condition, ConditionData } from './types';
import { State } from './reducer';

export type Action =
  | { type: 'FETCH_CATEGORIES' }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'FETCH_CONDITION'; payload: Condition }
  | { type: 'SET_CONDITION'; payload: { id: string; data: ConditionData } };

export type ActionHandlers = {
  fetchCategories: () => void;
  fetchCondition: (condition: Condition) => void;
};

const useActions = (
  state: State,
  dispatch: React.Dispatch<Action>,
): ActionHandlers => {
  return {
    fetchCategories: React.useMemo(
      () => () => {
        dispatch({ type: 'FETCH_CATEGORIES' });
      },
      [dispatch],
    ),
    fetchCondition: React.useMemo(
      () => (condition: Condition) => {
        if (!state.conditions[condition.id]) {
          dispatch({ type: 'FETCH_CONDITION', payload: condition });
        }
      },
      [state, dispatch],
    ),
  };
};

export default useActions;
