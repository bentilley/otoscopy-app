/** @format */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { OtoIcon, COLOURS } from 'components/design';
import { useFavourite } from 'model/user';

/**
 * FooterIcon
 * Icon used in the app Footer.
 * @param iconName - The name of the icon to display.
 * @param colour - The colour of the icon.
 * @param size - Size of the icon (default 40).
 * @param onPress - A callback for when the icon is pressed.
 * @param style - React Native style prop.
 */
export const FooterIcon: React.FC<Props> = ({
  iconName,
  colour,
  size,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <OtoIcon name={iconName} size={size || 40} color={colour} />
    </TouchableOpacity>
  );
};

type Props = {
  iconName: string;
  colour: string;
  size?: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * FavouriteStar
 * Favourite star icon, used to mark a slide as a favourite.
 * @param slideId - The ID of the slide this icon is associated with.
 * @param style - React Native style prop.
 */
export const FavouriteStar: React.FC<FavouriteStarProps> = ({
  slideId,
  size,
  style,
}) => {
  const [isFavourite, toggleFavourite] = useFavourite(slideId);
  return (
    <FooterIcon
      iconName={isFavourite ? 'star' : 'star-o'}
      colour={isFavourite ? COLOURS.favourite : COLOURS.grey}
      size={size}
      onPress={toggleFavourite}
      style={style}
    />
  );
};

type FavouriteStarProps = {
  slideId: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};
