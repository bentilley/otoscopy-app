/** @format */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLOURS, OtoText, OtoIcon } from "components/design";
import { Slide } from "model/condition/types";
import { ListItemContainer, Thumbnail } from "components/UI";
import { RemoveFavourite } from "./RemoveFavourite";
import { clip } from "utils";

type Props = {
  width: number;
  slide: Slide;
  onPress: () => void;
};

/**
 * ListItem
 * A single slide item on the favourites list.
 * @param width - the width of the item;
 * @param slide - the slide data for the item;
 * @param onPress - a callback for when the item is pressed.
 */
export const ListItem: React.FC<Props> = ({ width, slide, onPress }) => {
  const thumbnailWidth = 0.25 * width;
  return (
    <ListItemContainer
      img={<Thumbnail size={thumbnailWidth} slideId={slide.id} />}
      content={
        <React.Fragment>
          <View style={slideListItemStyles.infoHeader}>
            <View style={slideListItemStyles.title}>
              <OtoText size="smallMedium" weight="semibold">
                {clip(slide.condition, 24)}
              </OtoText>
            </View>
            <View>
              <TouchableOpacity
                onPress={onPress}
                style={slideListItemStyles.viewSlideButton}>
                <OtoText size="small" weight={"semibold"}>
                  view slide
                </OtoText>
                <OtoIcon name="caret-right" size={30} color={COLOURS.grey} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={slideListItemStyles.infoText}>
            <OtoText size="small">{clip(slide.diagnosis, 65)}</OtoText>
            <RemoveFavourite slideId={slide.id} />
          </View>
        </React.Fragment>
      }
    />
  );
};

const slideListItemStyles = StyleSheet.create({
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  title: { flexDirection: "row" },
  viewSlideButton: { flexDirection: "row", alignItems: "center" },
  infoText: { flex: 1, paddingVertical: 6, justifyContent: "space-between" },
});
