/** @format */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOURS, OtoText, OtoIcon } from 'components/design';
import { Slide } from 'model/condition/types';
import { FavouriteStar } from 'components/Footer/icons';
import { Thumbnail } from './Thumbnail';

type SlideListItemProps = {
  slide: Slide;
  onPress: () => void;
};

const SlideListItem: React.FC<SlideListItemProps> = ({ slide, onPress }) => {
  return (
    <View style={slideListItemStyles.container}>
      <View style={slideListItemStyles.imageContainer}>
        <Thumbnail slideId={slide.id} />
      </View>
      <View style={slideListItemStyles.infoContainer}>
        <View style={slideListItemStyles.infoHeader}>
          <View style={slideListItemStyles.title}>
            <FavouriteStar slideId={slide.id} size={30} />
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
          <OtoText size="small">{slide.diagnosis}</OtoText>
        </View>
      </View>
    </View>
  );
};

export const slideListItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: 120,
    borderBottomColor: COLOURS.dark,
    borderBottomWidth: 1,
  },
  imageContainer: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  image: { width: 110, height: 110 },
  infoContainer: { flex: 5, paddingLeft: 6 },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  title: { flexDirection: 'row' },
  viewSlideButton: { flexDirection: 'row', alignItems: 'center' },
  infoText: { flex: 1, paddingVertical: 8, justifyContent: 'space-between' },
});

export default SlideListItem;
