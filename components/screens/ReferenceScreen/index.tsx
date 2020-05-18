/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
import Reference from 'components/Reference';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Reference'>;
  route: RouteProp<RootStackParamList, 'Reference'>;
};

const ReferenceScreen: React.FC<Props> = ({ navigation }) => {
  const navigationFunctions = {
    goToCondition: (condition: string) =>
      navigation.navigate('Condition', { condition }),
  };
  return <Reference {...navigationFunctions} />;
};

export default ReferenceScreen;
