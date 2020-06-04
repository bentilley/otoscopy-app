/** @format */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { OtoIcon, COLOURS } from 'components/design';

const MAX_DRAW_HEIGHT = 370;
const MIN_MOVEMENT_FOR_CLOSE = 20;

type DrawAndCallbacks = [React.FC, () => void, () => void];
interface DrawMovementCallbacks {
  onDrawOpenStart?: () => void;
  onDrawOpenComplete?: () => void;
  onDrawCloseStart?: () => void;
  onDrawCloseComplete?: () => void;
}
type UseDrawFunc = { (callbacks: DrawMovementCallbacks): DrawAndCallbacks };

/**
 * useDraw
 * Hook for creating a Draw component with declaritive open and close functions.
 * @param onDrawOpenStart - Callback for when the draw starts opening.
 * @param onDrawOpenComplete - Callback for when the draw finishes opening.
 * @param onDrawCloseStart - Callback for when the draw starts closing.
 * @param onDrawCloseComplete - Callback for when the draw finishes closing.
 */
export const useDraw: UseDrawFunc = ({
  onDrawOpenStart,
  onDrawOpenComplete,
  onDrawCloseStart,
  onDrawCloseComplete,
}) => {
  const drawHeight = React.useRef(new Animated.Value(0)).current;
  const moveStartY = React.useRef(0);

  const openDraw = () => {
    onDrawOpenStart && onDrawOpenStart();
    Animated.timing(drawHeight, {
      toValue: MAX_DRAW_HEIGHT,
      useNativeDriver: false,
    }).start(({ finished }) =>
      finished && onDrawOpenComplete ? onDrawOpenComplete() : null,
    );
  };

  const closeDraw = () => {
    onDrawCloseStart && onDrawCloseStart();
    Animated.timing(drawHeight, {
      toValue: 0,
      useNativeDriver: false,
    }).start(({ finished }) =>
      finished && onDrawCloseComplete ? onDrawCloseComplete() : null,
    );
  };

  /**
   * Draw
   * Slide up draw at bottom of app.
   * @param children - Component(s) to display in the draw.
   */
  const DrawComponent: React.FC = ({ children }) => (
    <Animated.View style={[styles.container, { height: drawHeight }]}>
      <View
        style={styles.pullTab}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={({ nativeEvent: e }) => {
          moveStartY.current = e.pageY;
        }}
        onResponderMove={({ nativeEvent: e }) => {
          const movedSoFarY = e.pageY - moveStartY.current;
          if (movedSoFarY < -MIN_MOVEMENT_FOR_CLOSE) {
            openDraw();
          } else if (movedSoFarY < MIN_MOVEMENT_FOR_CLOSE) {
            drawHeight.setValue(MAX_DRAW_HEIGHT - movedSoFarY);
          } else {
            closeDraw();
          }
        }}
        onResponderRelease={({ nativeEvent: e }) => {
          const totalMove = e.pageY - moveStartY.current;
          if (totalMove < MIN_MOVEMENT_FOR_CLOSE) {
            openDraw();
          } else {
            closeDraw();
          }
        }}>
        <OtoIcon name="caret-down" size={45} color={COLOURS.lightGrey} />
      </View>
      {children}
    </Animated.View>
  );
  return [DrawComponent, openDraw, closeDraw];
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
