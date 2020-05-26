/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import SlideList from 'components/SlideList';

type SlideListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SlideList'>;
  route: RouteProp<RootStackParamList, 'SlideList'>;
};

const SlideListScreen: React.FC<SlideListProps> = ({ route, navigation }) => {
  const text = (route.params && route.params.slides) || '';
  return (
    <SlideList
      text={text}
      goToSlide={(slide: { slides: string }) =>
        navigation.navigate('Slide', slide)
      }
    />
  );
};

export default SlideListScreen;
