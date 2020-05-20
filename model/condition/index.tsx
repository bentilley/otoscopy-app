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

const initialState = {
  categories: [],
  conditions: {},
};

const ConditionStateContext = React.createContext<State>(initialState);

type Props = {
  children: JSX.Element;
};

export const ConditionProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    getCategories(setCategories);
  }, [setCategories]);

  const [conditions, setConditions] = React.useState<ConditionDataState>({});

  return (
    <ConditionStateContext.Provider
      value={{ categories, conditions, setConditions }}>
      {children}
    </ConditionStateContext.Provider>
  );
};

export const useConditions = () => {
  const context = React.useContext<State>(ConditionStateContext);
  if (context === undefined) {
    throw new Error('Probably not in Provider!');
  }
  const { categories, conditions } = context;
  return { categories, conditions };
};

export const useCondition = (conditionId: string) => {
  const { conditions, setConditions } = React.useContext(ConditionStateContext);
  if (!setConditions) {
    throw new TypeError('setConditions is not defined here!');
  }

  if (conditions[conditionId]) {
    return { info: conditions[conditionId] };
  } else {
    const newConditions = { ...conditions };
    firestore()
      .collection('conditions')
      .doc(conditionId)
      .get()
      .then(
        (doc) => {
          const data = doc.data();
          newConditions[conditionId] = data as ConditionData;
          setConditions(newConditions);
        },
        (err) => {
          console.error(err);
        },
      );
    return { info: null };
  }
};

export type Category = {
  name: string;
  conditions: Condition[];
};

export type Condition = {
  id: string;
  name: string;
};

export type ConditionData = {
  name: string;
  description: string;
  aetiology: ConditionSection;
  audiology: ConditionSection;
  clinical_signs: ConditionSection;
  complications: ConditionSection;
  investigations: ConditionSection;
  management: ConditionSection;
  otoscopy: ConditionSection;
  population: ConditionSection;
  risk_factors: ConditionSection;
  symptoms: ConditionSection;
};

export type ConditionSection = string[] | { [index: string]: SectionDetail };

type SectionDetail = {
  title: string;
  information: string[];
};

type ConditionDataState = { [index: string]: ConditionData };

type State = {
  categories: Category[];
  conditions: ConditionDataState;
  setConditions?: React.Dispatch<React.SetStateAction<ConditionDataState>>;
};
