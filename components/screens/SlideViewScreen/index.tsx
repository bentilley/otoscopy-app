/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
/* import { Slide } from 'model/condition/types'; */
import { slideData } from 'components/SlideList/__mocks__/slide-data';
import { SlideView, SlideViewProvider } from 'components/SlideView';

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

const SlideViewScreen: React.FC<SlideProps> = ({ route }) => {
  /* const text = (route.params && route.params.slide) || ''; */
  const slide = route.params.slide;
  return (
    <SlideViewProvider>
      <SlideView
        goToCondition={() => {
          console.log('goToCondition');
        }}
        goToNextSlide={() => {
          console.log('goToNextSlide');
        }}
        slide={slideData[0]}
      />
    </SlideViewProvider>
  );
};

export default SlideViewScreen;
