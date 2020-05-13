/** @format */

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { UserProvider } from './model/user';
import MenuScreen from './components/screens/MenuScreen/';

export type RootStackParamList = {
  Menu: undefined;
  Reference: undefined;
  Condition: { condition: string };
  Slide: { slides: string } | undefined;
  SlideList: { slides: string } | undefined;
};

type ReferenceProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Reference'>;
  route: RouteProp<RootStackParamList, 'Reference'>;
};

const ReferenceScreen: React.FC<ReferenceProps> = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Reference</Text>
      <Button
        title="condition A"
        onPress={() => navigation.navigate('Condition', { condition: 'A' })}
      />
      <Button
        title="condition B"
        onPress={() => navigation.navigate('Condition', { condition: 'B' })}
      />
      <Button
        title="condition C"
        onPress={() => navigation.navigate('Condition', { condition: 'C' })}
      />
    </View>
  );
};

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

type SlideProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Slide'>;
  route: RouteProp<RootStackParamList, 'Slide'>;
};

const SlideScreen: React.FC<SlideProps> = ({ route }) => {
  const text = (route.params && route.params.slides) || '';
  return (
    <View style={styles.screen}>
      <Text>Slide{text ? ` - ${text}` : ''}</Text>
    </View>
  );
};

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

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#15D6BE',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Button
                title="Menu"
                onPress={() => navigation.navigate('Menu')}
              />
            ),
          })}>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Reference" component={ReferenceScreen} />
          <Stack.Screen name="Condition" component={ConditionScreen} />
          <Stack.Screen name="Slide" component={SlideScreen} />
          <Stack.Screen name="SlideList" component={SlideListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
