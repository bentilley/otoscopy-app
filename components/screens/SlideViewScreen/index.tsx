/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'components/screens';
import { ConditionHead, Slide } from 'model/condition/types';
import { SlideView, SlideViewProvider } from 'components/SlideView';
import { useConditionsActions } from 'model/condition';

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

export const SlideViewScreen: React.FC<SlideProps> = ({
  navigation,
  route,
}) => {
  const { fetchCondition, fetchSlidesForCondition } = useConditionsActions();
  const navigationFunctions = {
    goToCondition: (slide: Slide) => {
      const condition = getCondition(slide);
      fetchCondition(condition);
      fetchSlidesForCondition(condition);
      navigation.navigate('Condition', { condition });
    },
  };
  return (
    <SlideViewProvider
      totalNumberOfSlides={route.params.slidePool.length}
      startingIndex={route.params.startingIndex || 0}>
      <SlideView {...navigationFunctions} slidePool={route.params.slidePool} />
    </SlideViewProvider>
  );
};

const getCondition = (slide: Slide): ConditionHead => ({
  id: slide.conditionId,
  name: slide.condition,
});
