/** @format */

import React, { Dispatch } from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  Category,
  ConditionHead,
  ConditionDataDB,
  SlideDataDB,
  FavouriteDataDB,
} from './types';
import { Action } from './actions';

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
      case 'FETCH_CATEGORIES':
        console.log('fetchCategories');
        fetchCategories(dispatch);
        break;
      case 'FETCH_CONDITION':
        console.log('fetchCondition');
        fetchCondition(dispatch, action.payload);
        break;
      case 'FETCH_SLIDES':
        console.log('fetchSlides');
        fetchSlides(dispatch, action.payload);
        break;
      case 'FETCH_USER_FAVOURITES':
        console.log('fetchUserFavourites');
        fetchUserFavourites(dispatch, action.payload);
        break;
      default:
        return value;
    }
    return value;
  };
  return enhancedDispatch;
};

const fetchCategories = async (dispatch: Dispatch<Action>): Promise<void> => {
  const query = await firestore().collection('categories').get();
  const categories = query.docs.map((doc) => doc.data()) as Category[];
  dispatch({ type: 'SET_CATEGORIES', payload: categories });
};

const fetchCondition = async (
  dispatch: Dispatch<Action>,
  condition: ConditionHead,
): Promise<void> => {
  const conditionDoc = firestore().collection('conditions').doc(condition.id);
  conditionDoc.get().then(
    (doc) => {
      const conditionData = doc.data() as ConditionDataDB;
      const data = { ...conditionData, id: doc.id };
      dispatch({ type: 'SET_CONDITION', payload: { id: doc.id, data } });
    },
    (err) => {
      console.error('Fetch Condition has failed!');
      console.error(err);
    },
  );
};

const fetchSlides = async (
  dispatch: Dispatch<Action>,
  condition: ConditionHead,
): Promise<void> => {
  const conditionDoc = firestore().collection('conditions').doc(condition.id);
  const slideCollection = conditionDoc.collection('slides');
  slideCollection.get().then(
    (snapshot) => {
      const slides = snapshot.docs.map((doc) => {
        const slideData = doc.data() as SlideDataDB;
        return { ...slideData, id: doc.id, conditionId: condition.id };
      });
      dispatch({ type: 'SET_SLIDES', payload: { slides, condition } });
    },
    (err) => {
      console.error('Fetch Slides has failed!');
      console.error(err);
    },
  );
};

const fetchUserFavourites = async (
  dispatch: Dispatch<Action>,
  userUid: string,
): Promise<void> => {
  const userCollection = firestore().collection('users');
  const userFavourites = userCollection.doc(userUid).collection('favourites');
  userFavourites.onSnapshot(({ docs }) => {
    const favourites = docs.map((doc) => {
      const slideData = doc.data() as FavouriteDataDB;
      return { ...slideData, id: doc.id };
    });
    dispatch({ type: 'SET_FAVOURITES', payload: favourites });
  });
};

export default useMiddleware;
