/** @format */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Slide } from 'model/condition/types';
import { OtoText } from 'components/design';
import { COLOURS } from 'components/design';
import { Footer } from 'components/Footer';

type Props = {
  slide: Slide;
  goToCondition: () => void;
};

const SlideView: React.FC<Props> = ({ slide, goToCondition }) => {
  return (
    <React.Fragment>
      <View style={styles.screen}>
        <View style={styles.spacer}>
          <OtoText size="large" weight="bold">
            Tap to reveal diagnosis
          </OtoText>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: slide.img_url }} style={styles.image} />
        </View>
        <View style={styles.spacer} />
      </View>
      <Footer />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.black,
  },
  imageContainer: { justifyContent: 'center' },
  image: { width: 400, height: 400 },
  spacer: { flex: 1, justifyContent: 'center' },
});

export default SlideView;
