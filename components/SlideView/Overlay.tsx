/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { SlideImage } from "components/UI";
import { COLOURS } from "components/design";

type Props = {
  size: number;
  firebaseRef: string;
};

/**
 * MainImage
 * The central image for each slide.
 * @param size - the width and height of the square image;
 * @param firebaseRef - firebase storage path used to create the ref.
 */
export const Overlay: React.FC<Props> = ({ size, firebaseRef }) => {
  const dimensions = { width: size, height: size };
  return (
    <View style={style.container}>
      <View style={[style.opacity, dimensions]} />
      <View style={[style.outline, dimensions, { borderRadius: size / 2 }]} />
      <SlideImage
        firebaseRef={firebaseRef}
        width={size}
        height={size}
        loaderSize="large"
        style={style.overlay}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
  },
  opacity: {
    position: "absolute",
    backgroundColor: COLOURS.veryDark,
    opacity: 0.3,
  },
  outline: {
    position: "absolute",
    borderWidth: 2,
    borderColor: COLOURS.primary,
  },
  overlay: {
    opacity: 1,
  },
});
