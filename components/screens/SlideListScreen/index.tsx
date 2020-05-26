/** @format */

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';

type SlideListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SlideList'>;
  route: RouteProp<RootStackParamList, 'SlideList'>;
};

const SlideListScreen: React.FC<SlideListProps> = ({ route, navigation }) => {
  const text = (route.params && route.params.slides) || '';
  return (
    <View style={styles.screen}>
      <Text>SlideList{text ? ` - ${text}` : ''}</Text>
      <Button
        title="A slide"
        onPress={() =>
          navigation.navigate('Slide', { slides: 'One of your favourites' })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  menuButton: { paddingHorizontal: 10 },
});

export default SlideListScreen;
