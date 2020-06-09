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
    }
  | { type: 'FETCH_USER_FAVOURITES'; payload: string }
  | { type: 'SET_FAVOURITES'; payload: Slide[] }
  | { type: 'ADD_TO_FAVOURITES'; payload: Slide }
  | { type: 'REMOVE_FROM_FAVOURITES'; payload: string };

export type ActionHandlers = {
  fetchCategories: () => void;
  fetchCondition: (condition: ConditionHead) => void;
  fetchSlides: (condition: ConditionHead) => void;
  fetchUserFavourites: (userEmail: string) => void;
  addToFavourites: (slideId: string) => void;
  removeFromFavourites: (slideId: string) => void;
};

const useActions = (
  state: State,
  dispatch: React.Dispatch<Action>,
): ActionHandlers => {
  const { conditions, conditionsWithSlides, slides } = state;
  return {
    fetchCategories: React.useMemo(
      () => () => {
        dispatch({ type: 'FETCH_CATEGORIES' });
      },
      [dispatch],
    ),
    fetchCondition: React.useMemo(
      () => (condition: ConditionHead) => {
        if (!conditions[condition.id]) {
          dispatch({ type: 'FETCH_CONDITION', payload: condition });
        }
      },
      [conditions, dispatch],
    ),
    fetchSlides: React.useMemo(
      () => (condition: ConditionHead) => {
        if (!conditionsWithSlides.includes(condition.id)) {
          dispatch({ type: 'FETCH_SLIDES', payload: condition });
        }
      },
      [conditionsWithSlides, dispatch],
    ),
    fetchUserFavourites: React.useMemo(
      () => (userUid: string) => {
        dispatch({ type: 'FETCH_USER_FAVOURITES', payload: userUid });
      },
      [dispatch],
    ),
    addToFavourites: React.useMemo(
      () => (slideId: string) => {
        dispatch({ type: 'ADD_TO_FAVOURITES', payload: slides[slideId] });
      },
      [dispatch, slides],
    ),
    removeFromFavourites: React.useMemo(
      () => (slideId: string) => {
        dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: slideId });
      },
      [dispatch],
    ),
  };
};

export default useActions;
