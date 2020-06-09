/** @format */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { OTOSCOPE_BOUNDARY_RADIUS } from './dimensions';
import storage from '@react-native-firebase/storage';

type Props = {
  slideId: string;
};

export const SlideImage: React.FC<Props> = ({ slideId }) => {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    storage()
      .ref('/slide-img/' + slideId + '.jpg')
      .getDownloadURL()
      .then(
        (downloadUrl) => setUrl(downloadUrl),
        (err) => console.error(err),
      );
  }, [slideId, setUrl]);

  return url ? (
    <Image source={{ uri: url }} style={styles.image} />
  ) : (
    <View style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: OTOSCOPE_BOUNDARY_RADIUS * 2,
    height: OTOSCOPE_BOUNDARY_RADIUS * 2,
  },
});

export { SlideViewProvider } from './context';
