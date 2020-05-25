/** @format */

import { Dispatch } from 'react';
import firestore from '@react-native-firebase/firestore';

import { Category } from './types';
import { Action } from './actions';

const applyMiddleware = (dispatch: Dispatch<Action>): Dispatch<Action> => {
  console.log('applyMiddleware');
  return async (action: Action) => {
    const value = dispatch(action);
    switch (action.type) {
      case 'GET_CATEGORIES':
        console.log('get them categories');
        const query = await firestore().collection('categories').get();
        const categories = query.docs.map((doc) => doc.data()) as Category[];
        /* const categories: Category[] = []; */
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
        break;
      default:
        console.log('nothing happening');
    }
    return value;
  };
};

export default applyMiddleware;
