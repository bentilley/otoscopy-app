/** @format */

import React from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';
import { COLOURS } from 'components/design';
import { OTOSCOPE_BOUNDARY_RADIUS, OTOSCOPE_RADIUS } from './dimensions';

export const Otoscope: React.FC = () => {
  const [hasInteractions, setHasInteractions] = React.useState(false);

  const otoscopePos = React.useRef({ x: 0, y: 0 });
  const otoscopePan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setHasInteractions(true);
      },
      onPanResponderMove: (_, { dx, dy }) => {
        const { x, y } = otoscopePos.current;
        otoscopePan.setValue(getNewPosWithBoundaryLimits(x + dx, y + dy));
      },
      onPanResponderRelease: () => {
        setHasInteractions(false);
        otoscopePan.flattenOffset();
        otoscopePan.stopAnimation((pos) => (otoscopePos.current = pos));
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animation, transformFromPosition(otoscopePan)]}>
        <View style={styles.overlay} />
        <View
          style={[
            styles.overlayHighligh,
            { borderColor: hasInteractions ? COLOURS.grey : COLOURS.black },
          ]}
        />
      </Animated.View>
      <View style={styles.boundary} {...panResponder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', overflow: 'hidden' },
  animation: {
    position: 'absolute',
    top: -OTOSCOPE_BOUNDARY_RADIUS,
    left: -OTOSCOPE_BOUNDARY_RADIUS,
  },
  overlay: {
    borderColor: COLOURS.black,
    borderWidth: (OTOSCOPE_BOUNDARY_RADIUS * 4 - OTOSCOPE_RADIUS * 2) / 2,
    width: OTOSCOPE_BOUNDARY_RADIUS * 4,
    height: OTOSCOPE_BOUNDARY_RADIUS * 4,
    borderRadius: OTOSCOPE_BOUNDARY_RADIUS * 2,
  },
  overlayHighligh: {
    position: 'absolute',
    top: OTOSCOPE_BOUNDARY_RADIUS * 2 - OTOSCOPE_RADIUS,
    left: OTOSCOPE_BOUNDARY_RADIUS * 2 - OTOSCOPE_RADIUS,
    width: OTOSCOPE_RADIUS * 2,
    height: OTOSCOPE_RADIUS * 2,
    borderRadius: OTOSCOPE_RADIUS,
    borderWidth: 1,
  },
  boundary: {
    width: OTOSCOPE_BOUNDARY_RADIUS * 2,
    height: OTOSCOPE_BOUNDARY_RADIUS * 2,
    borderRadius: OTOSCOPE_BOUNDARY_RADIUS,
    borderColor: COLOURS.primary,
    borderWidth: 2,
  },
});

type Pos = { x: number; y: number };
function getNewPosWithBoundaryLimits(x: number, y: number): Pos {
  const r = OTOSCOPE_BOUNDARY_RADIUS - OTOSCOPE_RADIUS;
  if (x * x + y * y < r * r) {
    return { x, y };
  } else if (y === 0) {
    return { x: Math.min(x, r), y: 0 };
  }
  const Py = Math.sqrt((r * r) / (1 + (x * x) / (y * y))) * (y < 0 ? -1 : 1);
  const Px = (x / y) * Py;
  return { x: Px, y: Py };
}

type TransformStyle = {
  transform: { translateX?: Animated.Value; translateY?: Animated.Value }[];
};
function transformFromPosition(pos: Animated.ValueXY): TransformStyle {
  return { transform: [{ translateX: pos.x }, { translateY: pos.y }] };
}
