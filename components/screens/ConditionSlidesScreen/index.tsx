/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import { ConditionSlides } from 'components/ConditionSlides';
import { Slide } from 'model/condition/types';

type SlideListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ConditionSlides'>;
  route: RouteProp<RootStackParamList, 'ConditionSlides'>;
};

export const ConditionSlidesScreen: React.FC<SlideListProps> = ({
  route,
  navigation,
}) => {
  const navigationFunctions = {
    goToSlide: (slide: Slide) => navigation.navigate('Slide', { slide }),
    goToCondition: () =>
      navigation.navigate('Condition', { condition: route.params.condition }),
  };
  return (
    <ConditionSlides slides={route.params.slides} {...navigationFunctions} />
  );
};
