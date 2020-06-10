/** @format */

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import { FavouriteSlides } from 'components/FavouriteSlides';
import { Slide } from 'model/condition/types';
import { useConditions } from 'model/condition';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Favourites'>;
};

export const FavouriteSlidesScreen: React.FC<Props> = ({ navigation }) => {
  const { getFavourites } = useConditions();
  const navigationFunctions = {
    goToSlide: (slide: Slide) => navigation.navigate('Slide', { slide }),
    studyFavourites: () => console.log('study favourites'),
  };
  return <FavouriteSlides slides={getFavourites()} {...navigationFunctions} />;
};
