/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import Menu from 'components/Menu';
import { slideData } from 'components/SlideList/__mocks__/slide-data';

type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Menu'>;
  route: RouteProp<RootStackParamList, 'Menu'>;
};

export const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  const navigationFunctions = {
    goToReference: () => navigation.navigate('Reference'),
    goToFavourites: () =>
      navigation.navigate('SlideList', {
        slides: slideData,
        isFavourites: true,
      }),
    goToBrowse: () => navigation.navigate('Slide', { slide: 'random' }),
  };
  return <Menu {...navigationFunctions} />;
};
