/** @format */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLOURS, OtoText, OtoIcon } from 'components/design';
import { Slide } from 'model/condition/types';
import { slideListItemStyles } from './SlideListItem';

type SlideListItemProps = {
  slide: Slide;
  onPress: () => void;
};

const FavouriteSlideListItem: React.FC<SlideListItemProps> = ({
  slide,
  onPress,
}) => {
  return (
    <View style={slideListItemStyles.container}>
      <View style={slideListItemStyles.imageContainer}>
        <Image
          style={slideListItemStyles.image}
          source={{ uri: slide.thumbnail_url }}
        />
      </View>
      <View style={slideListItemStyles.infoContainer}>
        <View style={slideListItemStyles.infoHeader}>
          <View style={slideListItemStyles.title}>
            <OtoText size="medium" weight="semibold">
              {slide.condition}
            </OtoText>
          </View>
          <View>
            <TouchableOpacity
              onPress={onPress}
              style={slideListItemStyles.viewSlideButton}>
              <OtoText size="small" weight={'semibold'}>
                view slide
              </OtoText>
              <OtoIcon name="caret-right" size={30} color={COLOURS.grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={slideListItemStyles.infoText}>
          <OtoText size="small">{clip(slide.diagnosis, 65)}</OtoText>
          <RemoveFavourite />
        </View>
      </View>
    </View>
  );
};

const RemoveFavourite: React.FC = () => {
  return (
    <TouchableOpacity style={removeFavouriteStyles.container}>
      <OtoIcon name="caret-right" size={15} color={COLOURS.primary} />
      <OtoText size="small">
        <Text style={{ color: COLOURS.primary }}>remove</Text>
      </OtoText>
    </TouchableOpacity>
  );
};

const removeFavouriteStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
});

function clip(str: string, clipLength: number): string {
  if (str.length > clipLength) {
    return str.slice(0, clipLength) + '...';
  } else {
    return str;
  }
}

export default FavouriteSlideListItem;
