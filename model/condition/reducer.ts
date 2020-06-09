/** @format */

import { Category, Condition, Slide } from './types';
import { Action } from './actions';

export type State = {
  categories: Category[];
  conditions: { [index: string]: Condition };
  conditionsWithSlides: string[];
  slides: Slide[];
  favourites: { [slideId: string]: Slide };
};

export const initialState: State = {
  categories: [],
  conditions: {},
  conditionsWithSlides: [],
  slides: [],
  favourites: {},
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
    case 'SET_SLIDES':
      return {
        ...state,
        slides: [...state.slides, ...action.payload.slides],
        conditionsWithSlides: [
          ...state.conditionsWithSlides,
          action.payload.condition.id,
        ],
      };
    case 'SET_FAVOURITES':
      return {
        ...state,
        favourites: action.payload.reduce(
          (slideObj: { [slideId: string]: Slide }, slide) => {
            slideObj[slide.id] = slide;
            return slideObj;
          },
          {},
        ),
      };
    default:
      return state;
  }
};

export default reducer;
