/** @format */

import React, { Dispatch } from "react";
import { db } from "services/firebase";

// TODO Import types as a namespace
import { ConditionHead, Slide } from "./types";
import { Action } from "./actions";

const useMiddleware = (dispatch: Dispatch<Action>): Dispatch<Action> => {
  const enhancedDispatch = React.useMemo(() => getWrappedDispatch(dispatch), [
    dispatch,
  ]);
  return enhancedDispatch;
};

const getWrappedDispatch = (dispatch: Dispatch<Action>) => {
  const enhancedDispatch = async (action: Action) => {
    const value = dispatch(action);
    switch (action.type) {
      case "FETCH_CATEGORIES":
        fetchCategories(dispatch);
        break;
      case "FETCH_CONDITION":
        fetchCondition(dispatch, action.payload);
        break;
      case "FETCH_SLIDES_FOR_CONDITION":
        fetchSlidesForCondition(dispatch, action.payload);
        break;
      case "FETCH_USER_FAVOURITES":
        fetchUserFavourites(dispatch, action.payload);
        break;
      case "ADD_TO_FAVOURITES":
        addToFavourites(action.payload);
        break;
      case "REMOVE_FROM_FAVOURITES":
        removeFromFavourites(action.payload);
        break;
      case "SUBMIT_FEEDBACK":
        submitFeedback(action.payload);
        break;
      default:
        return value;
    }
    return value;
  };
  return enhancedDispatch;
};

const fetchCategories = async (dispatch: Dispatch<Action>): Promise<void> => {
  dispatch({ type: "SET_CATEGORIES", payload: await db.getCategories() });
};

const fetchCondition = async (
  dispatch: Dispatch<Action>,
  condition: ConditionHead,
): Promise<void> => {
  const data = await db.getCondition(condition.id);
  if (data) {
    dispatch({ type: "SET_CONDITION", payload: { id: data.id, data } });
  }
};

const fetchSlidesForCondition = async (
  dispatch: Dispatch<Action>,
  condition: ConditionHead,
): Promise<void> => {
  const slides = await db.getSlidesForCondition(condition.id);
  dispatch({ type: "SET_SLIDES", payload: { slides, condition } });
};

const fetchUserFavourites = async (
  dispatch: Dispatch<Action>,
  userUid: string,
): Promise<void> => {
  db.watchUserFavourites(userUid, (favourites: Slide[]) => {
    dispatch({ type: "SET_FAVOURITES", payload: favourites });
  });
};

const addToFavourites = async (payload: {
  slide: Slide;
  userUid: string;
}): Promise<void> => {
  db.addFavourite(payload.userUid, payload.slide);
};

const removeFromFavourites = async (payload: {
  slideId: string;
  userUid: string;
}): Promise<void> => {
  db.deleteFavourite(payload.userUid, payload.slideId);
};

const submitFeedback = async (payload: {
  userUid: string;
  userEmail: string;
  msg: string;
}): Promise<void> => {
  db.submitFeedback(payload.userUid, payload.userEmail, payload.msg);
};

export default useMiddleware;
