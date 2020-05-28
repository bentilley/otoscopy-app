/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import SlideList from 'components/SlideList';
import { Slide } from 'model/condition/types';

type SlideListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SlideList'>;
  route: RouteProp<RootStackParamList, 'SlideList'>;
};

const SlideListScreen: React.FC<SlideListProps> = ({ route, navigation }) => {
  return (
    <SlideList
      slides={route.params.slides}
      isFavourites={route.params.isFavourites}
      goToSlide={(slide: Slide) => navigation.navigate('Slide', { slide })}
    />
  );
};

export default SlideListScreen;
