/** @format */

import React from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { OtoIcon, COLOURS } from "components/design";
import { useSlideViewState } from "./context";
import { MIN_MOVEMENT_FOR_CLOSE, useMaxDrawerHeight } from "./dimensions";

interface Props {
  onOpenStart?: () => void;
  onOpenComplete?: () => void;
  onCloseStart?: () => void;
  onCloseComplete?: () => void;
}

/**
 * Draw
 * Slide up draw at bottom of app.
 * @param children - Component(s) to display in the draw.
 * @param onOpenStart - Function to run when the drawer starts opening.
 * @param onOpenComplete - Function to run when the drawer finishes opening.
 * @param onCloseStart - Function to run when the drawer starts closing.
 * @param onCloseComplete - Function to fun when the draw finishes closing.
 */
export const Drawer: React.FC<Props> = ({
  children,
  onOpenStart,
  onOpenComplete,
  onCloseStart,
  onCloseComplete,
}) => {
  const {
    drawerHeight,
    moveStartY,
    setMoveStartY,
    openDrawer,
    closeDrawer,
  } = useSlideViewState().drawer;
  const maxDrawerHeight = useMaxDrawerHeight();
  return (
    <Animated.View style={[styles.container, { height: drawerHeight }]}>
      <View
        style={styles.pullTab}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={({ nativeEvent: e }) => setMoveStartY(e.pageY)}
        onResponderMove={({ nativeEvent: e }) => {
          const movedSoFarY = e.pageY - moveStartY.current;
          if (movedSoFarY < -MIN_MOVEMENT_FOR_CLOSE) {
            openDrawer(onOpenStart, onOpenComplete);
          } else if (movedSoFarY < MIN_MOVEMENT_FOR_CLOSE) {
            drawerHeight.setValue(maxDrawerHeight - movedSoFarY);
          } else {
            closeDrawer(onCloseStart, onCloseComplete);
          }
        }}
        onResponderRelease={({ nativeEvent: e }) => {
          const totalMove = e.pageY - moveStartY.current;
          if (totalMove < MIN_MOVEMENT_FOR_CLOSE) {
            openDrawer(onOpenStart, onOpenComplete);
          } else {
            closeDrawer(onCloseStart, onCloseComplete);
          }
        }}>
        <TouchableOpacity
          onPress={() => closeDrawer(onCloseStart, onCloseComplete)}
          testID="slide-view__close_drawer">
          <OtoIcon name="caret-down" size={45} color={COLOURS.lightGrey} />
        </TouchableOpacity>
      </View>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOURS.dark,
    opacity: 0.8,
  },
  pullTab: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
