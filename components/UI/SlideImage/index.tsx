/** @format */

import React from 'react';
import { View, Image } from 'react-native';
import storage from '@react-native-firebase/storage';
import { useErrorHandling } from 'services/error-handling';

type Props = {
  firebaseRef: string;
  width: number;
  height: number;
};

export const SlideImage: React.FC<Props> = ({ firebaseRef, width, height }) => {
  const [url, setUrl] = React.useState<string | null>(null);
  const { logError } = useErrorHandling();

  React.useEffect(() => {
    storage()
      .ref(firebaseRef)
      .getDownloadURL()
      .then(
        (downloadUrl) => setUrl(downloadUrl),
        (err) => {
          setUrl(null);
          logError(err, { firebaseRef });
        },
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
  return <View style={{ width, height }} />;
};
