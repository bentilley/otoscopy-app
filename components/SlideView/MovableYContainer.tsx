/** @format */

import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useSlideViewState } from './context';

/**
 * MovableYContainer
 * Simple container that can be translated up and down from its position.
 * @param children - Component(s) to display in the container.
 */
export const MovableYContainer: React.FC = ({ children }) => {
  const { movableYContainer } = useSlideViewState();
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: movableYContainer.imageTranslationY }] },
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});
