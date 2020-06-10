/** @format */

import { Category, ConditionHead, Condition, Slide } from './types';
import { Action } from './actions';

export type State = {
  categories: Category[];
  conditionsToFetch: ConditionHead[];
  conditions: { [index: string]: Condition };
  slides: { [slideId: string]: Slide };
  conditionsWithSlides: string[];
  favourites: { [slideId: string]: Slide };
};

export const initialState: State = {
  categories: [],
  conditions: {},
  slides: {},
  conditionsWithSlides: [],
  favourites: {},
  conditionsToFetch: [],
};

const reducer = (state: State, action: Action): State => {
  let favourites: { [slideId: string]: Slide };
  switch (action.type) {
    case 'SET_CATEGORIES':
      const conditionsToFetch = action.payload.reduce(
        (conditions, category) => conditions.concat(category.conditions),
        [] as ConditionHead[],
      );
      return { ...state, categories: action.payload, conditionsToFetch };
    case 'SET_CONDITIONS_TO_FETCH':
      return { ...state, conditionsToFetch: action.payload };
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
        slides: {
          ...state.slides,
          ...action.payload.slides.reduce(
            (slideObj: { [slideId: string]: Slide }, slide) => {
              slideObj[slide.id] = slide;
              return slideObj;
            },
            {},
          ),
        },
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
    case 'ADD_TO_FAVOURITES':
      favourites = { ...state.favourites };
      favourites[action.payload.slide.id] = action.payload.slide;
      return { ...state, favourites };
    case 'REMOVE_FROM_FAVOURITES':
      favourites = { ...state.favourites };
      delete favourites[action.payload.slideId];
      return { ...state, favourites };
    default:
      return state;
  }
};

export default reducer;
