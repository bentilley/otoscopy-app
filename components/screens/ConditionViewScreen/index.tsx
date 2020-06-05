/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import ConditionView from 'components/ConditionView';
import { useConditions } from 'model/condition';

type ConditionProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Condition'>;
  route: RouteProp<RootStackParamList, 'Condition'>;
};

const ConditionViewScreen: React.FC<ConditionProps> = ({
  route,
  navigation,
}) => {
  const condition = route.params.condition;
  const { getCondition, getSlidesForCondition } = useConditions();

  const navigationFunctions = {
    goToSlides: () => {
      navigation.navigate('SlideList', {
        slides: getSlidesForCondition(condition.id),
        isFavourites: false,
      });
    },
  };
  return (
    <ConditionView
      {...navigationFunctions}
      condition={getCondition(condition.id)}
    />
  );
};

export default ConditionViewScreen;
