/** @format */

import React from 'react';
import { View, Image, StyleSheet, Animated, PanResponder } from 'react-native';
import { Slide } from 'model/condition/types';
import { OtoText } from 'components/design';
import { COLOURS } from 'components/design';
import { Footer } from 'components';

type Props = {
  slide: Slide;
  goToCondition: () => void;
};

function currentDistFromCenter(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

const SlideView: React.FC<Props> = ({ slide, goToCondition }) => {
  const otoscopePos = React.useRef({ x: 0, y: 0 });
  const otoscopePan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        otoscopePan.setOffset({
          x: otoscopePos.current.x,
          y: otoscopePos.current.y,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        if (
          currentDistFromCenter(
            otoscopePos.current.x + gestureState.dx,
            otoscopePos.current.y + gestureState.dy,
          ) < 100
        ) {
          otoscopePan.setValue({ x: gestureState.dx, y: gestureState.dy });
        }
      },
      onPanResponderRelease: () => {
        otoscopePan.flattenOffset();
        otoscopePan.stopAnimation((pos) => (otoscopePos.current = pos));
      },
    }),
  ).current;
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
          <Animated.View
            style={[
              otoscopeStyles.animation,
              {
                transform: [
                  { translateX: otoscopePan.x },
                  { translateY: otoscopePan.y },
                ],
              },
            ]}
            {...panResponder.panHandlers}>
            <View style={otoscopeStyles.overlay} />
          </Animated.View>
        </View>
        <View style={styles.spacer} />
      </View>
      <Footer>
        <OtoText size="medium">Hello Bug</OtoText>
      </Footer>
    </React.Fragment>
  );
};

const otoscopeStyles = StyleSheet.create({
  animation: {
    position: 'absolute',
    left: -200,
  },
  overlay: {
    borderColor: COLOURS.dark,
    borderWidth: 300,
    width: 800,
    height: 800,
    borderRadius: 800 / 2,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.black,
  },
  imageContainer: { justifyContent: 'center', overflow: 'hidden' },
  image: { width: 400, height: 400 },
  spacer: { flex: 1, justifyContent: 'center' },
});

export default SlideView;
