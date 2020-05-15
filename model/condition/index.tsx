/** @format */

import React from 'react';
import firestore from '@react-native-firebase/firestore';

async function getCategories(
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) {
  console.log('getCategories');
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
  console.log('Rendering ConditionProvider');
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
