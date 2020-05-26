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
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_CONDITION':
      return {
        ...state,
        conditions: {
          ...state.conditions,
          [action.payload.id]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
