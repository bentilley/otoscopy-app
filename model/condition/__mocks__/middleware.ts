/** @format */

import React, { Dispatch } from "react";
import { categories } from "./categories.data";
import { condition } from "./condition.data";
import { slides } from "./slides.data";
import { favourites } from "./favourites.data";
import { Action } from "../actions";

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
        fetchCondition(dispatch);
        break;
      case "FETCH_SLIDES_FOR_CONDITION":
        fetchSlidesForCondition(dispatch);
        break;
      case "FETCH_USER_FAVOURITES":
        fetchUserFavourites(dispatch);
        break;
      case "ADD_TO_FAVOURITES":
        addToFavourites();
        break;
      case "REMOVE_FROM_FAVOURITES":
        removeFromFavourites();
        break;
      default:
        return value;
    }
    return value;
  };
  return enhancedDispatch;
};

const fetchCategories = async (dispatch: Dispatch<Action>): Promise<void> => {
  dispatch({ type: "SET_CATEGORIES", payload: categories });
};

const fetchCondition = async (dispatch: Dispatch<Action>): Promise<void> => {
  dispatch({
    type: "SET_CONDITION",
    payload: { id: condition.id, data: condition },
  });
};

const fetchSlidesForCondition = async (
  dispatch: Dispatch<Action>,
): Promise<void> => {
  dispatch({ type: "SET_SLIDES", payload: { slides, condition } });
};

const fetchUserFavourites = async (
  dispatch: Dispatch<Action>,
): Promise<void> => {
  dispatch({ type: "SET_FAVOURITES", payload: favourites });
};

const addToFavourites = jest.fn();
const removeFromFavourites = jest.fn();

export default useMiddleware;
