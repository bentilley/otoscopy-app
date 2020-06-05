/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import { Condition, Slide } from 'model/condition/types';
import { slideData } from 'components/SlideList/__mocks__/slide-data';
import { SlideView, SlideViewProvider } from 'components/SlideView';

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

const SlideViewScreen: React.FC<SlideProps> = ({ navigation, route }) => {
  const slide = route.params.slide;
  const navigationFunctions = {
    goToCondition: () => {
      navigation.navigate('Condition', { condition: getCondition(slide) });
    },
    goToNextSlide: () => {
      console.log('goToNextSlide');
    },
  };
  return (
    <SlideViewProvider>
      <SlideView {...navigationFunctions} slide={slideData[0]} />
    </SlideViewProvider>
  );
};

const getCondition = (slide: Slide): Condition => ({
  id: slide.conditionId,
  name: slide.condition,
});

export default SlideViewScreen;
