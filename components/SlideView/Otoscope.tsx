/** @format */

import React from "react";
import { View, StyleSheet, Animated, PanResponder } from "react-native";
import { COLOURS } from "components/design";

interface Props {
  radius: number;
}

export const Otoscope: React.FC<Props> = ({ radius }) => {
  const [hasInteractions, setHasInteractions] = React.useState(false);

  const otoscopePos = React.useRef({ x: 0, y: 0 });
  const otoscopePan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        setHasInteractions(true);
      },
      onPanResponderMove: (_, { dx, dy }) => {
        const { x, y } = otoscopePos.current;
        otoscopePan.setValue(
          getNewPosWithBoundaryLimits(x + dx, y + dy, radius),
        );
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
        style={[
          styles.animation,
          animationStylesFromRadius(radius),
          transformFromPosition(otoscopePan),
        ]}>
        <View style={[styles.overlay, overlayStylesFromRadius(radius)]} />
        <View
          style={[
            styles.overlayHighlight,
            overlayHighlighStylesFromRadius(radius),
            { borderColor: hasInteractions ? COLOURS.grey : COLOURS.black },
          ]}
        />
      </Animated.View>
      <View
        style={[styles.boundary, boundaryStylesFromRadius(radius)]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const animationStylesFromRadius = (radius: number) => {
  return { top: -radius, left: -radius };
};

const overlayStylesFromRadius = (radius: number) => {
  const viewPortDiameter = radius;
  return {
    borderWidth: (radius * 4 - viewPortDiameter) / 2,
    width: radius * 4,
    height: radius * 4,
    borderRadius: radius * 2,
  };
};

const overlayHighlighStylesFromRadius = (radius: number) => {
  const viewPortDiameter = radius;
  return {
    top: radius * 2 - viewPortDiameter / 2,
    left: radius * 2 - viewPortDiameter / 2,
    width: viewPortDiameter,
    height: viewPortDiameter,
    borderRadius: viewPortDiameter / 2,
  };
};

const boundaryStylesFromRadius = (radius: number) => {
  return {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
  };
};

const styles = StyleSheet.create({
  container: { position: "absolute", overflow: "hidden" },
  animation: {
    position: "absolute",
  },
  overlay: {
    borderColor: COLOURS.black,
  },
  overlayHighlight: {
    position: "absolute",
    borderWidth: 1,
  },
  boundary: {
    borderColor: COLOURS.primary,
    borderWidth: 2,
  },
});

type Pos = { x: number; y: number };
function getNewPosWithBoundaryLimits(
  x: number,
  y: number,
  radius: number,
): Pos {
  const viewPortRadius = 0.5 * radius;
  const r = radius - viewPortRadius;
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
