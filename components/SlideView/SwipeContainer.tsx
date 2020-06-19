/** @format */

import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { StyleSheet, Animated } from 'react-native';
import { COLOURS } from 'components/design';

type Props = {};

export const SwipeContainer: React.FC<Props> = ({ children }) => {
  const swipeX = React.useRef(new Animated.Value(0)).current;
  const swipeXStart = React.useRef(0);
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: swipeX }] }]}
      onMoveShouldSetResponder={(e: GestureResponderEvent) => {
        swipeXStart.current = e.nativeEvent.pageX;
        return true;
      }}
      onResponderMove={(e: GestureResponderEvent) => {
        console.log('hello', e.nativeEvent.pageX - swipeXStart.current);
        swipeX.setValue(e.nativeEvent.pageX - swipeXStart.current);
      }}
      onResponderRelease={() => (swipeXStart.current = 0)}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: COLOURS.black,
  },
});
