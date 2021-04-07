/** @format */

import React from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageStyle,
} from "react-native";
import { getDownloadURL } from "services/firebase";
import { useErrorHandling } from "services/error-handling";
import { COLOURS } from "components/design";

type Props = {
  firebaseRef: string;
  width: number;
  height: number;
  loaderSize?: "small" | "large";
  style?: ImageStyle;
};

/**
 * SlideImage
 * Image component that works with firebase refs.
 * @param firebaseRef - firebase storage path used to create the ref.
 * @param width - the width of the image.
 * @param height - the height of the image.
 * @param loaderSize - the size of the loader to display while fetching.
 */
export const SlideImage: React.FC<Props> = ({
  firebaseRef,
  width,
  height,
  loaderSize,
  style,
}) => {
  const [url, setUrl] = React.useState<string | null>(null);
  const { logError } = useErrorHandling();

  React.useEffect(() => {
    setUrl(null);
    getDownloadURL(firebaseRef).then(
      (downloadUrl) => setUrl(downloadUrl),
      (err) => logError(err, { firebaseRef }),
    );
  }, [firebaseRef, setUrl, logError]);

  return url ? (
    <Image
      source={{ uri: url }}
      style={[{ width, height }, style]}
      testID={`slide-image-${firebaseRef}`}
    />
  ) : (
    <LoadingImgPlaceholder
      width={width}
      height={height}
      loaderSize={loaderSize || "small"}
    />
  );
};

type LoadingImgPlaceholderProps = {
  width: number;
  height: number;
  loaderSize: "small" | "large";
};

/**
 * LoadingImgPlaceholder
 * Loading component to display while the image is loading.
 * @param width - the width of the image (used to make placeholder same size).
 * @param height - the height of the image (used to make placeholder same size).
 * @param loaderSize - the size of the spinning loader to display.
 */
const LoadingImgPlaceholder: React.FC<LoadingImgPlaceholderProps> = ({
  width,
  height,
  loaderSize,
}) => {
  return (
    <View style={[styles.loading, { width, height }]}>
      <ActivityIndicator size={loaderSize} color={COLOURS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { justifyContent: "center", alignItems: "center" },
});
