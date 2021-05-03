/** @format */

import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import { FavouriteSlides } from "components/FavouriteSlides";
import { Slide } from "model/condition/types";
import { useConditions } from "model/condition";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Favourites">;
};

export const FavouriteSlidesScreen: React.FC<Props> = ({ navigation }) => {
  const { getFavourites, getFavouritesArray, getSlidesArray } = useConditions();
  const navigationFunctions = {
    goToSlide: (slide: Slide) => {
      const slidePool = getSlidesArray();
      const startingIndex = slidePool.map((s) => s.id).indexOf(slide.id);
      navigation.push("Slide", { slidePool, startingIndex, showTitle: false });
    },
    studyFavourites: () => {
      const slidePool = getFavouritesArray();
      navigation.push("Slide", { slidePool, showTitle: false });
    },
  };
  return <FavouriteSlides slides={getFavourites()} {...navigationFunctions} />;
};
