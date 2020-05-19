/** @format */

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'App';

type ConditionProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Condition'>;
  route: RouteProp<RootStackParamList, 'Condition'>;
};

const ConditionScreen: React.FC<ConditionProps> = ({ route, navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Condition</Text>
      <Text>Here are some facts about {route.params.condition}</Text>
      <Button
        title="View Slides"
        onPress={() =>
          navigation.navigate('SlideList', { slides: 'condition slides' })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default ConditionScreen;
