/** @format */

import { useWindowDimensions } from 'react-native';

export const HEADER_HEIGHT = 85; // estimate of the React Navigation header
export const MIN_MOVEMENT_FOR_CLOSE = 20;

export const useMaxDrawerHeight = (): number => {
  const windowHeight = useWindowDimensions().height;
  return 0.4 * windowHeight;
};

const IMAGE_PADDING = 10;
export const useImageSize = (): number => {
  const windowWidth = useWindowDimensions().width;
  return windowWidth - 2 * IMAGE_PADDING;
};

export const useMaxImageY = (): number => {
  const windowHeight = useWindowDimensions().height;
  const imageSize = useImageSize();
  return -(windowHeight / 2 - imageSize / 2 - HEADER_HEIGHT);
};
