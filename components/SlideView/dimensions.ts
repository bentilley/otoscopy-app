/** @format */

import { useWindowDimensions } from 'react-native';

export const HEADER_HEIGHT = 85; // estimate of the React Navigation header
// TODO remove otoscope radius hardcoded value, make relative to width
export const OTOSCOPE_BOUNDARY_RADIUS = 200;
export const OTOSCOPE_RADIUS = 120;
export const MIN_MOVEMENT_FOR_CLOSE = 20;

export const useMaxImageY = (): number => {
  const windowHeight = useWindowDimensions().height;
  return -(windowHeight / 2 - OTOSCOPE_BOUNDARY_RADIUS - HEADER_HEIGHT);
};

export const useMaxDrawerHeight = (): number => {
  const windowHeight = useWindowDimensions().height;
  return 0.4 * windowHeight;
};
