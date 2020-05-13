/** @format */

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';
/* import Menu from '../../Menu'; */

type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Menu'>;
  route: RouteProp<RootStackParamList, 'Menu'>;
};

const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Menu</Text>
      <Button
        title="Conditions"
        onPress={() => navigation.navigate('Reference')}
      />
      <Button
        title="Favourites"
        onPress={() =>
          navigation.navigate('SlideList', { slides: 'favourites' })
        }
      />
      <Button
        title="Random Browse"
        onPress={() => navigation.navigate('Slide', { slides: 'random' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default MenuScreen;
