/** @format */

import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import storage from '@react-native-firebase/storage';
import { useErrorHandling } from 'services/error-handling';
import { COLOURS } from 'components/design';

type Props = {
  firebaseRef: string;
  width: number;
  height: number;
};

export const SlideImage: React.FC<Props> = ({ firebaseRef, width, height }) => {
  const [url, setUrl] = React.useState<string | null>(null);
  const { logError } = useErrorHandling();

  React.useEffect(() => {
    setUrl(null);
    storage()
      .ref(firebaseRef)
      .getDownloadURL()
      .then(
        (downloadUrl) => setUrl(downloadUrl),
        (err) => logError(err, { firebaseRef }),
      );
  }, [firebaseRef, setUrl, logError]);

  return url ? (
    <Image source={{ uri: url }} style={{ width, height }} />
  ) : (
    <LoadingImgPlaceholder width={width} height={height} />
  );
};

type LoadingImgPlaceholderProps = { width: number; height: number };

const LoadingImgPlaceholder: React.FC<LoadingImgPlaceholderProps> = ({
  width,
  height,
}) => {
  return (
    <View style={[styles.loading, { width, height }]}>
      <ActivityIndicator size="small" color={COLOURS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { justifyContent: 'center', alignItems: 'center' },
});
