/** @format */

import { Category, ConditionData } from './types';
import { Action } from './actions';

export type State = {
  categories: Category[];
  conditions: { [index: string]: ConditionData };
};

export const initialState = {
  categories: [],
  conditions: {},
};

const reducer = (state: State, action: Action): State => {
  console.log(action);
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default reducer;
