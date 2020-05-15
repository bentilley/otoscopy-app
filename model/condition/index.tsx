/** @format */

import React from 'react';

const ConditionStateContext = React.createContext<Selectors | {}>({});
const ConditionActionsContext = React.createContext<Actions>({});

type Props = {
  children: JSX.Element;
};

export const ConditionProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const data = getSelectors(state);

  const enhancedDispatch = applyMiddleware(dispatch);
  const actions = getActions(state, enhancedDispatch);

  return (
    <ConditionStateContext.Provider value={data}>
      <ConditionActionsContext.Provider value={actions}>
        {children}
      </ConditionActionsContext.Provider>
    </ConditionStateContext.Provider>
  );
};

export const useConditionState = () => {
  const context = React.useContext(ConditionStateContext);
  if (context === undefined) {
    throw new Error('Probably not in Provider!');
  }
  return context;
};

export const useConditionActions = () => {
  const context = React.useContext(ConditionActionsContext);
  if (context === undefined) {
    throw new Error('Probably not in Provider!');
  }
  return context;
};

const initialState = { categories: [] };

type Category = {
  name: string;
  conditions: Condition[];
};

type Condition = {
  id: string;
  name: string;
};

type State = {
  categories: Category[];
};

type Action = { type: 'GET_CATEGORIES' };

type Actions = { [index: string]: () => void };

type Selectors = {
  categories: () => Category[];
};

type Dispatch = React.Dispatch<Action>;

const getSelectors = (state: State): Selectors => ({
  categories: () => state.categories,
});

const applyMiddleware = (dispatch: Dispatch): Dispatch => {
  return dispatch;
};

const getActions = (state: State, dispatch: Dispatch): Actions => ({
  getCategories: () => dispatch({ type: 'GET_CATEGORIES' }),
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      break;
    default:
      return state;
  }
  return state;
};
