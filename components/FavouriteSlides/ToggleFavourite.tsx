/** @format */

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOURS, OtoText, OtoIcon } from 'components/design';
import { useConditionsActions } from 'model/condition';

type ToggleFavouriteProps = { slideId: string; isFavourite: boolean };

export const ToggleFavourite: React.FC<ToggleFavouriteProps> = ({
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
      <OtoIcon name="close" size={11} color={COLOURS.error} />
      <OtoText size="small">
        <Text style={{ color: COLOURS.error }}> {text}</Text>
      </OtoText>
    </TouchableOpacity>
  );
};

const removeFavouriteStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
});
