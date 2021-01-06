/** @format */

import React from "react";
import { Category, ConditionHead, Condition, Slide } from "./types";
import { State } from "./reducer";

export type Action =
  | { type: "FETCH_CATEGORIES" }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "SET_CONDITIONS_TO_FETCH"; payload: ConditionHead[] }
  | { type: "FETCH_CONDITION"; payload: ConditionHead }
  | { type: "SET_CONDITION"; payload: { id: string; data: Condition } }
  | { type: "FETCH_SLIDES_FOR_CONDITION"; payload: ConditionHead }
  | {
      type: "SET_SLIDES";
      payload: { slides: Slide[]; condition: ConditionHead };
    }
  | { type: "FETCH_USER_FAVOURITES"; payload: string }
  | { type: "SET_FAVOURITES"; payload: Slide[] }
  | { type: "ADD_TO_FAVOURITES"; payload: { slide: Slide; userUid: string } }
  | {
      type: "REMOVE_FROM_FAVOURITES";
      payload: { slideId: string; userUid: string };
    };

export type ActionHandlers = {
  fetchCategories: () => void;
  fetchCondition: (condition: ConditionHead) => void;
  fetchSlidesForCondition: (condition: ConditionHead) => void;
  fetchUserFavourites: (userEmail: string) => void;
  addToFavourites: (slideId: string) => void;
  removeFromFavourites: (slideId: string) => void;
  popConditionToFetch: () => ConditionHead | undefined;
};

const useActions = (
  state: State,
  dispatch: React.Dispatch<Action>,
  userUid: string,
): ActionHandlers => {
  const { conditions, conditionsWithSlides, slides } = state;
  return {
    fetchCategories: React.useMemo(
      () => () => {
        dispatch({ type: "FETCH_CATEGORIES" });
      },
      [dispatch],
    ),
    popConditionToFetch: () => {
      const toFetch = [...state.conditionsToFetch];
      const next = toFetch.pop();
      if (next) {
        dispatch({ type: "SET_CONDITIONS_TO_FETCH", payload: toFetch });
      }
      return next;
    },
    fetchCondition: React.useMemo(
      () => (condition: ConditionHead) => {
        if (!conditions[condition.id]) {
          dispatch({ type: "FETCH_CONDITION", payload: condition });
        }
      },
      [conditions, dispatch],
    ),
    fetchSlidesForCondition: React.useMemo(
      () => (condition: ConditionHead) => {
        if (!conditionsWithSlides.includes(condition.id)) {
          dispatch({ type: "FETCH_SLIDES_FOR_CONDITION", payload: condition });
        }
      },
      [conditionsWithSlides, dispatch],
    ),
    fetchUserFavourites: React.useMemo(
      () => () => {
        dispatch({ type: "FETCH_USER_FAVOURITES", payload: userUid });
      },
      [dispatch, userUid],
    ),
    addToFavourites: React.useMemo(
      () => (slideId: string) => {
        dispatch({
          type: "ADD_TO_FAVOURITES",
          payload: { slide: slides[slideId], userUid },
        });
      },
      [dispatch, slides, userUid],
    ),
    removeFromFavourites: React.useMemo(
      () => (slideId: string) => {
        dispatch({
          type: "REMOVE_FROM_FAVOURITES",
          payload: { slideId, userUid },
        });
      },
      [dispatch, userUid],
    ),
  };
};

export default useActions;
