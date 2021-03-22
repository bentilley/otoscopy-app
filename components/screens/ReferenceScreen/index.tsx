/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import Reference from "components/Reference";
import { ConditionHead } from "model/condition/types";
import { useConditions, useConditionsActions } from "model/condition";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Reference">;
  route: RouteProp<RootStackParamList, "Reference">;
};

export const ReferenceScreen: React.FC<Props> = ({ navigation }) => {
  const { getCategories } = useConditions();
  const { fetchCondition, fetchSlidesForCondition } = useConditionsActions();

  const navigationFunctions = {
    goToCondition: (condition: ConditionHead) => {
      fetchCondition(condition);
      fetchSlidesForCondition(condition);
      navigation.navigate("Condition", { condition });
    },
    goToFavourites: () => navigation.navigate("Favourites"),
  };

  return <Reference {...navigationFunctions} categories={getCategories()} />;
};
