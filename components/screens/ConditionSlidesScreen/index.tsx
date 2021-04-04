/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import { ConditionSlides } from "components/ConditionSlides";
import { Slide } from "model/condition/types";
import { useConditions } from "model/condition";

type SlideListProps = {
  navigation: StackNavigationProp<RootStackParamList, "ConditionSlides">;
  route: RouteProp<RootStackParamList, "ConditionSlides">;
};

export const ConditionSlidesScreen: React.FC<SlideListProps> = ({
  route,
  navigation,
}) => {
  const { getSlidesArray, getSlidesArrayForCondition } = useConditions();
  const navigationFunctions = {
    goToSlide: (slide: Slide) => {
      const slidePool = getSlidesArray();
      const startingIndex = slidePool.map((s) => s.id).indexOf(slide.id);
      navigation.push("Slide", { slidePool, startingIndex });
    },
    goToStudySlides: () => {
      const slidePool = getSlidesArrayForCondition(route.params.condition);
      navigation.push("Slide", { slidePool });
    },
  };
  return (
    <ConditionSlides slides={route.params.slides} {...navigationFunctions} />
  );
};
