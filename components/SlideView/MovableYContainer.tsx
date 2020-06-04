/** @format */

import React from 'react';
import { StyleSheet, Animated } from 'react-native';

type ContainerAndCallbacks = [React.FC, (Y: number) => void];
type UseMovableYContainerFunction = { (): ContainerAndCallbacks };

/**
 * useMovableYContainer
 * Hook for creating MoveableContainer component and declaritive move function.
 */
export const useMovableYContainer: UseMovableYContainerFunction = () => {
  const imageTranslationY = React.useRef(new Animated.Value(0)).current;

  const moveContainerTo = (Y: number) => {
    Animated.timing(imageTranslationY, {
      toValue: Y,
      useNativeDriver: false,
    }).start();
  };

  /**
   * MovableYContainer
   * Simple container that can be translated up and down from its position.
   * @param children - Component(s) to display in the container.
   */
  const Container: React.FC = ({ children }) => (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: imageTranslationY }] },
      ]}>
      {children}
    </Animated.View>
  );

  return [Container, moveContainerTo];
};

const styles = StyleSheet.create({ container: { justifyContent: 'center' } });
