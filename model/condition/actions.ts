/** @format */
/* eslint react-hooks/rules-of-hooks: off */
// getActions is only called within a provider component deterministically

import React from 'react';
import { Category } from './types';
import { State } from './reducer';

export type Action =
  | { type: 'GET_CATEGORIES' }
  | { type: 'SET_CATEGORIES'; payload: Category[] };

export type ActionHandlers = {
  getCategories: () => void;
};

const getActions = (
  state: State,
  dispatch: React.Dispatch<Action>,
): ActionHandlers => {
  console.log('getActions');
  return {
    getCategories: React.useMemo(
      () => () => {
        dispatch({ type: 'GET_CATEGORIES' });
      },
      [dispatch],
    ),
  };
};

export default getActions;
