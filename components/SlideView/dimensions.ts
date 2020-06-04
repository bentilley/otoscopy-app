/** @format */

import { useWindowDimensions } from 'react-native';

export const HEADER_HEIGHT = 85; // estimate of the React Navigation header
export const OTOSCOPE_BOUNDARY_RADIUS = 200;
export const OTOSCOPE_RADIUS = 120;

export const useMaxImageY = (): number => {
  const windowHeight = useWindowDimensions().height;
  return -(windowHeight / 2 - OTOSCOPE_BOUNDARY_RADIUS - HEADER_HEIGHT);
};
