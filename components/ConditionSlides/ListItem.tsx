/** @format */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOURS, OtoText, OtoIcon } from 'components/design';
import { Slide } from 'model/condition/types';
import { FavouriteStar } from 'components/Footer/icons';
import { ListItemContainer } from 'components/UI';
import { Thumbnail } from 'components/UI';

type Props = {
  width: number;
  slide: Slide;
  onPress: () => void;
};

/**
 * ListItem
 * A single slide item on the condition slide list.
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
        </React.Fragment>
      }
    />
  );
};

const slideListItemStyles = StyleSheet.create({
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
