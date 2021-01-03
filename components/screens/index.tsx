/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ConditionProvider } from "model/condition";
import { ConditionHead, Slide } from "model/condition/types";
import { LoginScreen } from "components/screens/LoginScreen";
import { SignUpScreen } from "components/screens/SignUpScreen";
import { MenuScreen } from "components/screens/MenuScreen";
import { ReferenceScreen } from "components/screens/ReferenceScreen";
import { ConditionViewScreen } from "components/screens/ConditionViewScreen";
import { SlideViewScreen } from "components/screens/SlideViewScreen";
import { ConditionSlidesScreen } from "components/screens/ConditionSlidesScreen";
import { FavouriteSlidesScreen } from "components/screens/FavouriteSlidesScreen";
import { COLOURS } from "components/design/";
import { MenuButton } from "./MenuButton";

export type RootStackParamList = {
  Menu: undefined;
  Reference: undefined;
  Condition: { condition: ConditionHead };
  Slide: { slidePool: Slide[]; startingIndex?: number };
  ConditionSlides: {
    condition: ConditionHead;
    slides: { [slideId: string]: Slide };
  };
  Favourites: undefined;
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
              fontWeight: "bold",
            },
            headerRight: () => <MenuButton navigation={navigation} />,
          })}>
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ title: "" }}
          />
          <Stack.Screen name="Reference" component={ReferenceScreen} />
          <Stack.Screen name="Condition" component={ConditionViewScreen} />
          <Stack.Screen name="Slide" component={SlideViewScreen} />
          <Stack.Screen
            name="ConditionSlides"
            component={ConditionSlidesScreen}
          />
          <Stack.Screen name="Favourites" component={FavouriteSlidesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConditionProvider>
  );
};

export type LoginStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const LoginStack = createStackNavigator<LoginStackParamList>();

export const LoginScreens = () => {
  return (
    <NavigationContainer>
      <LoginStack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          title: "",
          headerStyle: {
            backgroundColor: COLOURS.veryDark,
            shadowColor: COLOURS.dark,
          },
          headerTintColor: COLOURS.lightGrey,
        })}>
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="SignUp" component={SignUpScreen} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};
