/** @format */

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { UserProvider } from 'model/user';
import { ConditionProvider } from 'model/condition';
import MenuScreen from 'components/screens/MenuScreen';
import ReferenceScreen from 'components/screens/ReferenceScreen';
import { COLOURS } from 'components/design/';

export type RootStackParamList = {
  Menu: undefined;
  Reference: undefined;
  Condition: { condition: string };
  Slide: { slides: string } | undefined;
  SlideList: { slides: string } | undefined;
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
      <ConditionProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={({ navigation }) => ({
              headerStyle: {
                backgroundColor: COLOURS.veryDark,
                shadowColor: COLOURS.dark,
              },
              headerTintColor: COLOURS.lightGrey,
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
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{ title: '' }}
            />
            <Stack.Screen name="Reference" component={ReferenceScreen} />
            <Stack.Screen name="Condition" component={ConditionScreen} />
            <Stack.Screen name="Slide" component={SlideScreen} />
            <Stack.Screen name="SlideList" component={SlideListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ConditionProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
