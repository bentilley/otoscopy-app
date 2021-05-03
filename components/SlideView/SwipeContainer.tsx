/** @format */

import React from "react";
import { GestureResponderEvent, useWindowDimensions } from "react-native";
import { StyleSheet, Animated } from "react-native";
import { COLOURS } from "components/design";

const MOVEMENT_THRESHOLD = 0.15;
const MAXIMUM_MOVEMENT = 0.8;

type Props = {
  onSwipeRightComplete: () => void;
  onSwipeLeftComplete: () => void;
};

/**
 * SwipeContainer
 * A container that fade swipes its contents left and right.
 * @param children - Component(s) to display in the container.
 * @param onSwipeRightComplete - callback from when swipe right completes.
 * @param onSwipeLeftComplete - callback from when swipe left completes.
 */
export const SwipeContainer: React.FC<Props> = ({
  children,
  onSwipeRightComplete,
  onSwipeLeftComplete,
}) => {
  const xMovement = React.useRef(new Animated.Value(0)).current;
  const xMovementInitial = React.useRef(0);
  const deviceWidth = useWindowDimensions().width;

  const reset = () =>
    Animated.timing(xMovement, {
      toValue: 0,
      useNativeDriver: false,
    }).start();

  const swipeTo = (value: number, onComplete: () => void) =>
    Animated.timing(xMovement, {
      toValue: value,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onComplete && onComplete();
        xMovement.setValue(0);
      }
    });

  return (
    <Animated.View
      style={[styles.container, getStyleFromPos(xMovement, deviceWidth)]}
      onMoveShouldSetResponder={(e: GestureResponderEvent) => {
        xMovementInitial.current = e.nativeEvent.pageX;
        return true;
      }}
      onResponderMove={(e: GestureResponderEvent) => {
        xMovement.setValue(e.nativeEvent.pageX - xMovementInitial.current);
      }}
      onResponderRelease={(e: GestureResponderEvent) => {
        const currentMovement = e.nativeEvent.pageX - xMovementInitial.current;
        if (currentMovement > MOVEMENT_THRESHOLD * deviceWidth) {
          swipeTo(MAXIMUM_MOVEMENT * deviceWidth, onSwipeRightComplete);
        } else if (currentMovement < -MOVEMENT_THRESHOLD * deviceWidth) {
          swipeTo(-MAXIMUM_MOVEMENT * deviceWidth, onSwipeLeftComplete);
        } else {
          reset();
        }
      }}>
      {children}
    </Animated.View>
  );
};

interface AnimatedStyle {
  transform: { translateX: Animated.Value }[];
  opacity: Animated.AnimatedInterpolation;
}
function getStyleFromPos(x: Animated.Value, width: number): AnimatedStyle {
  return {
    transform: [{ translateX: x }],
    opacity: x.interpolate({
      inputRange: [-MAXIMUM_MOVEMENT * width, 0, MAXIMUM_MOVEMENT * width],
      outputRange: [0, 1, 0],
    }),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: COLOURS.black,
  },
});
