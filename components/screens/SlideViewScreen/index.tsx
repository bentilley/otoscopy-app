/** @format */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
/* import { Slide } from 'model/condition/types'; */

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

const SlideViewScreen: React.FC<SlideProps> = ({ route }) => {
  const text = (route.params && route.params.slide) || '';
  return (
    <View style={styles.screen}>
      <Text>Slide Monkey {text ? ` - ${text}` : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  menuButton: { paddingHorizontal: 10 },
});

export default SlideViewScreen;
