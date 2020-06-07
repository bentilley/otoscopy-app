/** @format */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConditionProvider } from 'model/condition';
import { ConditionHead, Slide } from 'model/condition/types';
import { MenuScreen } from 'components/screens/MenuScreen';
import { ReferenceScreen } from 'components/screens/ReferenceScreen';
import { ConditionViewScreen } from 'components/screens/ConditionViewScreen';
import { SlideListScreen } from 'components/screens/SlideListScreen';
import { SlideViewScreen } from 'components/screens/SlideViewScreen';
import { COLOURS } from 'components/design/';
import { MenuButton } from './MenuButton';

export type RootStackParamList = {
  Menu: undefined;
  Reference: undefined;
  Condition: { condition: ConditionHead };
  Slide: { slide: Slide };
  SlideList: { slides: Slide[]; isFavourites: boolean };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppScreens = () => {
  return (
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
          <Stack.Screen name="Condition" component={ConditionViewScreen} />
          <Stack.Screen name="Slide" component={SlideViewScreen} />
          <Stack.Screen name="SlideList" component={SlideListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConditionProvider>
  );
};
