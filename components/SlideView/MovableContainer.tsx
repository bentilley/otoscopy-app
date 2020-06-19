/** @format */

import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useSlideViewState } from './context';

/**
 * MovableContainer
 * Simple container that can be translated up and down from its position.
 * @param children - Component(s) to display in the container.
 */
export const MovableContainer: React.FC = ({ children }) => {
  const { movableContainer } = useSlideViewState();
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: movableContainer.translation.y }] },
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});
