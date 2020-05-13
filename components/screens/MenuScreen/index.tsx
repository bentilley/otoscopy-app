/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import Menu from '../../Menu';

type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Menu'>;
  route: RouteProp<RootStackParamList, 'Menu'>;
};

const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  const navigationFunctions = {
    goToReference: () => navigation.navigate('Reference'),
    goToFavourites: () =>
      navigation.navigate('SlideList', { slides: 'favourites' }),
    goToBrowse: () => navigation.navigate('Slide', { slides: 'random' }),
  };
  return <Menu {...navigationFunctions} />;
};

export default MenuScreen;
