/** @format */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLOURS } from "components/design";

type Props = {
  loaderSize: "small" | "large";
};

/**
 * LoadingImgPlaceholder
 * Loading component to display while the image is loading.
 * @param width - the width of the image (used to make placeholder same size).
 * @param height - the height of the image (used to make placeholder same size).
 * @param loaderSize - the size of the spinning loader to display.
 */
export const LoadingView: React.FC<Props> = ({ loaderSize }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={loaderSize} color={COLOURS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { justifyContent: "center", alignItems: "center" },
});
