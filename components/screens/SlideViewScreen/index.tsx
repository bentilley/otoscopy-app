/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import { ConditionHead, Slide } from "model/condition/types";
import { SlideView, SlideViewProvider } from "components/SlideView";
import { useConditions, useConditionsActions } from "model/condition";
import { LoadingView } from "components/UI";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Slide">;
  route: RouteProp<RootStackParamList, "Slide">;
};

export const SlideViewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { fetchCondition, fetchSlidesForCondition } = useConditionsActions();
  const { getSlidesArray } = useConditions();
  const slidePool = route.params.slidePool || getSlidesArray();
  if (slidePool.length === 0) {
    return <LoadingView loaderSize="large" />;
  }

  const navigationFunctions = {
    goToCondition: (slide: Slide) => {
      const condition = getCondition(slide);
      fetchCondition(condition);
      fetchSlidesForCondition(condition);
      navigation.navigate("Condition", { condition });
    },
  };

  return (
    <SlideViewProvider
      totalNumberOfSlides={slidePool.length}
      startingIndex={route.params.startingIndex}>
      <SlideView {...navigationFunctions} slidePool={slidePool} />
    </SlideViewProvider>
  );
};

const getCondition = (slide: Slide): ConditionHead => ({
  id: slide.conditionId,
  name: slide.condition,
});
