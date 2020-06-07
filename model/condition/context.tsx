/** @format */

import React from 'react';
import reducer, { initialState } from './reducer';
import useActions from './actions';
import useSelectors from './selectors';
import useMiddleware from './middleware';

import { Selectors } from './selectors';
import { ActionHandlers } from './actions';
import { checkIfInvalidContext } from 'utils';

const ConditionStateContext = React.createContext<Selectors | null>(null);
const ConditionActionsContext = React.createContext<ActionHandlers | null>(
  null,
);

export const ConditionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log('ConditionProvider', state);

  const selectors = useSelectors(state);
  const enhancedDispatch = useMiddleware(dispatch);
  const actions = useActions(state, enhancedDispatch);

  const { fetchCategories } = actions;
  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
