/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import ConditionView from 'components/ConditionView';

type ConditionProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Condition'>;
  route: RouteProp<RootStackParamList, 'Condition'>;
};

const ConditionViewScreen: React.FC<ConditionProps> = ({
  route,
  navigation,
}) => {
  const navigationFunctions = {
    goToSlides: () => {
      navigation.navigate('SlideList', { slides: 'condition slides' });
    },
  };
  return (
    <ConditionView
      {...navigationFunctions}
      condition={route.params.condition}
    />
  );
};

export default ConditionViewScreen;
