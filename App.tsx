/** @format */

import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { UserProvider } from 'model/user';
import { ConditionProvider } from 'model/condition';
import MenuScreen from 'components/screens/MenuScreen';
import ReferenceScreen from 'components/screens/ReferenceScreen';
import ConditionScreen from 'components/screens/ConditionScreen';
import { OtoIcon, COLOURS } from 'components/design/';

export type RootStackParamList = {
  Menu: undefined;
  Reference: undefined;
  Condition: { condition: string };
  Slide: { slides: string } | undefined;
  SlideList: { slides: string } | undefined;
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

type MenuButtonProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const MenuButton: React.FC<MenuButtonProps> = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
      <View style={styles.menuButton}>
        <OtoIcon name="menu" size={40} style={{ color: COLOURS.grey }} />
      </View>
    </TouchableOpacity>
  );
};

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
              headerRight: () => <MenuButton navigation={navigation} />,
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
  menuButton: { paddingHorizontal: 10 },
});

export default App;
