/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
/* import { Slide } from 'model/condition/types'; */
import { slideData } from 'components/SlideList/__mocks__/slide-data';
import SlideView from 'components/SlideView';

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

const SlideViewScreen: React.FC<SlideProps> = ({ route }) => {
  /* const text = (route.params && route.params.slide) || ''; */
  const slide = route.params.slide;
  return (
    <SlideView
      goToCondition={() => {
        console.log('goToCondition');
      }}
      slide={slideData[0]}
    />
  );
};

export default SlideViewScreen;
