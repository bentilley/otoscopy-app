/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import { ConditionSlides } from 'components/ConditionSlides';
import { Slide } from 'model/condition/types';
import { useConditions } from 'model/condition';

type SlideListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ConditionSlides'>;
  route: RouteProp<RootStackParamList, 'ConditionSlides'>;
};

export const ConditionSlidesScreen: React.FC<SlideListProps> = ({
  route,
  navigation,
}) => {
  const { getSlidesArray } = useConditions();
  const navigationFunctions = {
    goToSlide: (slide: Slide) => {
      const slidePool = getSlidesArray();
      const startingIndex = slidePool.map((s) => s.id).indexOf(slide.id);
      navigation.navigate('Slide', { slidePool, startingIndex });
    },
    goToCondition: () =>
      navigation.navigate('Condition', { condition: route.params.condition }),
  };
  return (
    <ConditionSlides slides={route.params.slides} {...navigationFunctions} />
  );
};
