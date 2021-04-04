/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import { Menu } from "components/Menu";
import { useUser } from "model/user";
import { useConditions } from "model/condition";

type MenuProps = {
  navigation: StackNavigationProp<RootStackParamList, "Menu">;
  route: RouteProp<RootStackParamList, "Menu">;
};

export const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  const { signOutUser } = useUser();
  const { getSlidesArray } = useConditions();

  const navigationFunctions = {
    goToReference: () => navigation.replace("Reference"),
    goToFavourites: () => navigation.replace("Favourites"),
    goToBrowse: () =>
      navigation.navigate("Slide", { slidePool: getSlidesArray() }),
    goToContactUs: () => navigation.replace("ContactUs"),
    signOutUser,
  };
  return <Menu {...navigationFunctions} />;
};
