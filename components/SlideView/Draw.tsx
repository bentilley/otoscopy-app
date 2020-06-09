/** @format */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { OtoIcon, COLOURS } from 'components/design';
import { useSlideViewState } from './context';

// TODO Move these to dimensions and make them depend on the screem dimensions
const MAX_DRAW_HEIGHT = 370;
const MIN_MOVEMENT_FOR_CLOSE = 20;

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
  return (
    <Animated.View style={[styles.container, { height: drawerHeight }]}>
      <View
        style={styles.pullTab}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={({ nativeEvent: e }) => setMoveStartY(e.pageY)}
        onResponderMove={({ nativeEvent: e }) => {
          const movedSoFarY = e.pageY - moveStartY.current;
          if (movedSoFarY < -MIN_MOVEMENT_FOR_CLOSE) {
            openDrawer(onOpenStart, onOpenComplete);
          } else if (movedSoFarY < MIN_MOVEMENT_FOR_CLOSE) {
            drawerHeight.setValue(MAX_DRAW_HEIGHT - movedSoFarY);
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
        <OtoIcon name="caret-down" size={45} color={COLOURS.lightGrey} />
      </View>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOURS.dark,
    opacity: 0.8,
  },
  pullTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
