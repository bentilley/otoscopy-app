/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import ConditionView from "components/ConditionView";
import { useConditions, useConditionsActions } from "model/condition";

type ConditionProps = {
  navigation: StackNavigationProp<RootStackParamList, "Condition">;
  route: RouteProp<RootStackParamList, "Condition">;
};

export const ConditionViewScreen: React.FC<ConditionProps> = ({
  route,
  navigation,
}) => {
  const condition = route.params.condition;
  const { getCondition, getSlidesForCondition } = useConditions();
  const { fetchSlidesForCondition } = useConditionsActions();

  const navigationFunctions = {
    goToSlides: () => {
      fetchSlidesForCondition(condition);
      navigation.navigate("ConditionSlides", {
        condition,
        slides: getSlidesForCondition(condition.id),
      });
    },
  };
  return (
    <ConditionView
      {...navigationFunctions}
      condition={getCondition(condition.id)}
    />
  );
};
