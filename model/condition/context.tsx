/** @format */

import React from 'react';
import reducer, { initialState } from './reducer';
import useActions from './actions';
import useSelectors from './selectors';
import useMiddleware from './middleware';

import { Selectors } from './selectors';
import { ActionHandlers } from './actions';
import { checkIfInvalidContext } from 'utils';
import { useUser } from 'model/user';

const ConditionStateContext = React.createContext<Selectors | null>(null);
const ConditionActionsContext = React.createContext<ActionHandlers | null>(
  null,
);

export const ConditionProvider: React.FC = ({ children }) => {
  const { uid } = useUser().getUserSafe();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectors = useSelectors(state);
  const enhancedDispatch = useMiddleware(dispatch);
  const actions = useActions(state, enhancedDispatch, uid);

  const { fetchCategories, fetchUserFavourites } = actions;
  React.useEffect(() => {
    fetchCategories();
    fetchUserFavourites(uid);
  }, [uid, fetchCategories, fetchUserFavourites]);

  const { getCategories, getSlides, getRandomCondition } = selectors;
  const { fetchSlidesForCondition } = actions;
  React.useEffect(() => {
    const slides = getSlides();
    if (getCategories().length && !Object.values(slides).length) {
      fetchSlidesForCondition(getRandomCondition());
    }
  }, [getCategories, getSlides, fetchSlidesForCondition, getRandomCondition]);

  return (
    <ConditionStateContext.Provider value={selectors}>
      <ConditionActionsContext.Provider value={actions}>
        {children}
      </ConditionActionsContext.Provider>
    </ConditionStateContext.Provider>
  );
};

export const useConditions = (): Selectors => {
  const context = React.useContext<Selectors | null>(ConditionStateContext);
  checkIfInvalidContext<Selectors>(context);
  return context as Selectors;
};

export const useConditionsActions = (): ActionHandlers => {
  const context = React.useContext<ActionHandlers | null>(
    ConditionActionsContext,
  );
  checkIfInvalidContext<ActionHandlers>(context);
  return context as ActionHandlers;
};
