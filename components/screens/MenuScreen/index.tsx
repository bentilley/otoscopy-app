/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import { Menu } from 'components/Menu';
import { useUser } from 'model/user';
import { useConditions } from 'model/condition';

type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Menu'>;
  route: RouteProp<RootStackParamList, 'Menu'>;
};

export const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  const { signoutUser } = useUser();
  const { getFavourites } = useConditions();

  const navigationFunctions = {
    goToReference: () => navigation.navigate('Reference'),
    goToFavourites: () =>
      navigation.navigate('SlideList', {
        slides: getFavourites(),
        isFavourites: true,
      }),
    goToBrowse: () => navigation.navigate('Slide', { slide: 'random' }),
    signoutUser,
  };
  return <Menu {...navigationFunctions} />;
};
