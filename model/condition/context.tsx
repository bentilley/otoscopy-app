/** @format */

import React from 'react';
import reducer, { initialState } from './reducer';
import getActions from './actions';
import getSelectors from './selectors';
import applyMiddleware from './middleware';

import { Selectors } from './selectors';
import { ActionHandlers } from './actions';

const ConditionStateContext = React.createContext<Selectors | null>(null);
const ConditionActionsContext = React.createContext<ActionHandlers | null>(
  null,
);

export const ConditionProvider: React.FC = ({ children }) => {
  console.log('ConditionProvider render');
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectors = React.useMemo(() => getSelectors(state), [state]);
  const enhancedDispatch = React.useMemo(() => applyMiddleware(dispatch), [
    dispatch,
  ]);
  const actions = getActions(state, enhancedDispatch);

  const { getCategories } = actions;
  React.useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <ConditionStateContext.Provider value={selectors}>
      <ConditionActionsContext.Provider value={actions}>
        {children}
      </ConditionActionsContext.Provider>
    </ConditionStateContext.Provider>
  );
};

const checkIfInvalidContext = (
  context: Selectors | ActionHandlers | null | undefined,
): void => {
  if (context === undefined) {
    throw new Error('Probably not in Provider!');
  }
  if (context === null) {
    throw new Error('Using context before it is instantiated!');
  }
};

export const useConditions = (): Selectors => {
  const context = React.useContext<Selectors | null>(ConditionStateContext);
  checkIfInvalidContext(context);
  return context as Selectors;
};

export const useConditionsActions = (): ActionHandlers => {
  const context = React.useContext<ActionHandlers | null>(
    ConditionActionsContext,
  );
  checkIfInvalidContext(context);
  return context as ActionHandlers;
};

/* export const useCondition = (conditionId: string) => { */
/*   const { conditions, setConditions } = React.useContext(ConditionStateContext); */
/*   if (!setConditions) { */
/*     throw new TypeError('setConditions is not defined here!'); */
/*   } */

/*   if (conditions[conditionId]) { */
/*     return { info: conditions[conditionId] }; */
/*   } else { */
/*     const newConditions = { ...conditions }; */
/*     firestore() */
/*       .collection('conditions') */
/*       .doc(conditionId) */
/*       .get() */
/*       .then( */
/*         (doc) => { */
/*           const data = doc.data(); */
/*           console.log(JSON.stringify(data)); */
/*           newConditions[conditionId] = data as ConditionData; */
/*           setConditions(newConditions); */
/*         }, */
/*         (err) => { */
/*           console.error(err); */
/*         }, */
/*       ); */
/*     return { info: null }; */
/*   } */
/* }; */
