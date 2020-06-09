/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import { ConditionHead, Slide } from 'model/condition/types';
import { SlideView, SlideViewProvider } from 'components/SlideView';
import { useConditions } from 'model/condition';

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

export const SlideViewScreen: React.FC<SlideProps> = ({
  navigation,
  route,
}) => {
  const { getRandomSlide } = useConditions();
  const slide = route.params.slide;
  const navigationFunctions = {
    goToCondition: () => {
      navigation.navigate('Condition', { condition: getCondition(slide) });
    },
    goToNextSlide: () => {
      navigation.setParams({ slide: getRandomSlide() });
    },
  };
  return (
    <SlideViewProvider>
      <SlideView {...navigationFunctions} slide={slide} />
    </SlideViewProvider>
  );
};

const getCondition = (slide: Slide): ConditionHead => ({
  id: slide.conditionId,
  name: slide.condition,
});
