/** @format */

import React from 'react';
import { Category, ConditionHead, Condition, Slide } from './types';
import { State } from './reducer';

export type Action =
  | { type: 'FETCH_CATEGORIES' }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'FETCH_CONDITION'; payload: ConditionHead }
  | { type: 'SET_CONDITION'; payload: { id: string; data: Condition } }
  | { type: 'FETCH_SLIDES'; payload: ConditionHead }
  | {
      type: 'SET_SLIDES';
      payload: { slides: Slide[]; condition: ConditionHead };
    };

export type ActionHandlers = {
  fetchCategories: () => void;
  fetchCondition: (condition: ConditionHead) => void;
  fetchSlides: (condition: ConditionHead) => void;
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
    fetchSlides: React.useMemo(
      () => (condition: ConditionHead) => {
        if (!state.conditionsWithSlides.includes(condition.id)) {
          dispatch({ type: 'FETCH_SLIDES', payload: condition });
        }
      },
      [state, dispatch],
    ),
  };
};

export default useActions;
