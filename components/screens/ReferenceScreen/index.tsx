/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import Reference from 'components/Reference';
import { ConditionHead } from 'model/condition/types';
import { useConditions, useConditionsActions } from 'model/condition';
import { slideData } from 'components/SlideList/__mocks__/slide-data';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Reference'>;
  route: RouteProp<RootStackParamList, 'Reference'>;
};

const ReferenceScreen: React.FC<Props> = ({ navigation }) => {
  const { getCategories } = useConditions();
  const { fetchCondition, fetchSlides } = useConditionsActions();

  const navigationFunctions = {
    goToCondition: (condition: ConditionHead) => {
      fetchCondition(condition);
      fetchSlides(condition);
      navigation.navigate('Condition', { condition });
    },
    goToFavourites: () =>
      navigation.navigate('SlideList', {
        slides: slideData,
        isFavourites: true,
      }),
  };

  return <Reference {...navigationFunctions} categories={getCategories()} />;
};

export default ReferenceScreen;
