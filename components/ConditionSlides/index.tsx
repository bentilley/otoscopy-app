/** @format */

import React from "react";
import { useWindowDimensions } from "react-native";
import { Slide } from "model/condition/types";
import { ListItem } from "./ListItem";
import { ConditionSlidesFooter } from "./footer";
import { SlideList } from "components/UI/SlideList";

type Props = {
  slides: { [slideId: string]: Slide };
  goToSlide: (slide: Slide) => void;
  goToStudySlides: () => void;
};

export const ConditionSlides: React.FC<Props> = ({
  slides,
  goToSlide,
  goToStudySlides,
}) => {
  const width = useWindowDimensions().width;
  const slideArray = Object.values(slides);
  return (
    <SlideList
      slideArray={slideArray}
      renderItem={({ item: slide }) => (
        <ListItem
          width={width}
          slide={slide}
          onPress={() => goToSlide(slide)}
        />
      )}
      footer={<ConditionSlidesFooter goToStudySlides={goToStudySlides} />}
      testID="condition-slide-view-screen"
    />
  );
};
