/** @format */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { OtoIcon, COLOURS } from 'components/design';

const MAX_DRAW_HEIGHT = 370;

type Props = { content: Element };

const Draw: React.FC<Props> = ({ content }) => {
  const drawHeight = React.useRef(new Animated.Value(MAX_DRAW_HEIGHT)).current;
  const moveStartY = React.useRef(0);
  return (
    <Animated.View style={[styles.container, { height: drawHeight }]}>
      <View
        style={styles.pullTab}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={(e) => {
          moveStartY.current = e.nativeEvent.pageY;
        }}
        onResponderMove={({ nativeEvent: e }) => {
          drawHeight.setValue(370 - (e.pageY - moveStartY.current));
        }}>
        <OtoIcon name="caret-down" size={45} color={COLOURS.lightGrey} />
      </View>
      {content}
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

export default Draw;
