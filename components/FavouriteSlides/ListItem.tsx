/** @format */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOURS, OtoText, OtoIcon } from 'components/design';
import { Slide } from 'model/condition/types';
import { ListItemContainer } from 'components/UI';
import { Thumbnail } from './Thumbnail';
import { useConditions, useConditionsActions } from 'model/condition';
import { clip } from 'utils';

type Props = {
  slide: Slide;
  onPress: () => void;
};

export const ListItem: React.FC<Props> = ({ slide, onPress }) => {
  const { isFavourite } = useConditions();
  const isFavouriteSlide = isFavourite(slide.id);
  const backgroundColor = isFavouriteSlide ? COLOURS.veryDark : '#3e0000';
  return (
    <ListItemContainer
      img={<Thumbnail slideId={slide.id} />}
      backgroundColor={backgroundColor}
      content={
        <React.Fragment>
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
            <ToggleFavourite
              slideId={slide.id}
              isFavourite={isFavouriteSlide}
            />
          </View>
        </React.Fragment>
      }
    />
  );
};

type ToggleFavouriteProps = { slideId: string; isFavourite: boolean };

const ToggleFavourite: React.FC<ToggleFavouriteProps> = ({
  slideId,
  isFavourite,
}) => {
  const { removeFromFavourites, addToFavourites } = useConditionsActions();
  const text = isFavourite ? 'remove' : 'undo';
  return (
    <TouchableOpacity
      onPress={() =>
        isFavourite ? removeFromFavourites(slideId) : addToFavourites(slideId)
      }
      style={removeFavouriteStyles.container}>
      <OtoIcon name="caret-right" size={15} color={COLOURS.primary} />
      <OtoText size="small">
        <Text style={{ color: COLOURS.primary }}>{text}</Text>
      </OtoText>
    </TouchableOpacity>
  );
};

const removeFavouriteStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
});

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
