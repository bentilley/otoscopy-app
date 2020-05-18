/** @format */

import React from 'react';
import firestore from '@react-native-firebase/firestore';

async function getCategories(
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) {
  const query = await firestore().collection('categories').get();
  const categories = query.docs.map((doc) => doc.data());
  setCategories(categories as Category[]);
}

const initialState = { categories: [] };

const ConditionStateContext = React.createContext<State>(initialState);

type Props = {
  children: JSX.Element;
};

export const ConditionProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    getCategories(setCategories);
  }, [setCategories]);

  return (
    <ConditionStateContext.Provider value={{ categories }}>
      {children}
    </ConditionStateContext.Provider>
  );
};

export const useConditions = () => {
  const context = React.useContext(ConditionStateContext);
  if (context === undefined) {
    throw new Error('Probably not in Provider!');
  }
  return context;
};

export type Category = {
  name: string;
  conditions: Condition[];
};

export type Condition = {
  id: string;
  name: string;
};

type State = {
  categories: Category[];
};
