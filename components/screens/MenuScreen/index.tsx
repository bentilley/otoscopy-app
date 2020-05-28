/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import Menu from '../../Menu';
import { slideData } from 'components/SlideList/__mocks__/slide-data';
import { Slide } from 'model/condition/types';

type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Menu'>;
  route: RouteProp<RootStackParamList, 'Menu'>;
};

const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  const navigationFunctions = {
    goToReference: () => navigation.navigate('Reference'),
    goToFavourites: () =>
      navigation.navigate('SlideList', {
        slides: slideData as Slide[],
        isFavourites: true,
      }),
    goToBrowse: () => navigation.navigate('Slide', { slide: 'random' }),
  };
  return <Menu {...navigationFunctions} />;
};

export default MenuScreen;
