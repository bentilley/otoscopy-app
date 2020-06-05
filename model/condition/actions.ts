/** @format */

import React from 'react';
import { Category, ConditionHead, Condition, Slide } from './types';
import { State } from './reducer';

export type Action =
  | { type: 'FETCH_CATEGORIES' }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'FETCH_CONDITION'; payload: ConditionHead }
  | { type: 'SET_CONDITION'; payload: { id: string; data: Condition } }

export type ActionHandlers = {
  fetchCategories: () => void;
  fetchCondition: (condition: ConditionHead) => void;
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
      () => (condition: ConditionHead) => {
        if (!state.conditions[condition.id]) {
          dispatch({ type: 'FETCH_CONDITION', payload: condition });
        }
      },
      [state, dispatch],
    ),
  };
};

export default useActions;
