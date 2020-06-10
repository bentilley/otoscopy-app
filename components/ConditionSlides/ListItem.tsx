/** @format */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOURS, OtoText, OtoIcon } from 'components/design';
import { Slide } from 'model/condition/types';
import { FavouriteStar } from 'components/Footer/icons';
import { ListItemContainer } from 'components/UI';
import { Thumbnail } from './Thumbnail';

type Props = {
  slide: Slide;
  onPress: () => void;
};

export const ListItem: React.FC<Props> = ({ slide, onPress }) => {
  return (
    <ListItemContainer
      img={<Thumbnail slideId={slide.id} />}
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
