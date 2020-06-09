/** @format */

import React from 'react';
import { Animated } from 'react-native';

// TODO Move to dimensions and calculate from screen dimensions.
const MAX_DRAW_HEIGHT = 370;

/**
 * SlideViewState
 * Shared state for the SlideView component.
 * @param showOtoscope - Whether the otoscope view is showing.
 * @param isDiagnosed - Whether the slide is diagnosed or not.
 */
type State = { showOtoscope: boolean; isDiagnosed: boolean };

interface Context {
  state: State;
  update: {
    setShowOtoscope: (b: boolean) => void;
    setIsDiagnosed: (b: boolean) => void;
  };
  movableYContainer: {
    imageTranslationY: Animated.Value;
    moveContainerTo: (Y: number) => void;
  };
  drawer: {
    drawerHeight: Animated.Value;
    moveStartY: React.MutableRefObject<number>;
    setMoveStartY: (Y: number) => void;
    openDrawer: (onStart?: () => void, onComplete?: () => void) => void;
    closeDrawer: (onStart?: () => void, onComplete?: () => void) => void;
  };
}

const SlideViewContext = React.createContext<Context | null>(null);

/**
 * SlideViewProvider
 * Provider component for the SlideView context state.
 * @param children - Child react components.
 */
export const SlideViewProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<State>({
    showOtoscope: false,
    isDiagnosed: false,
  });

  const setShowOtoscope = (value: boolean) =>
    setState((prevState) => ({ ...prevState, showOtoscope: value }));
  const setIsDiagnosed = (value: boolean) =>
    setState((prevState) => ({ ...prevState, isDiagnosed: value }));

  const imageTranslationY = React.useRef(new Animated.Value(0)).current;
  const movableYContainer = {
    imageTranslationY,
    moveContainerTo: (Y: number) => {
      Animated.timing(imageTranslationY, {
        toValue: Y,
        useNativeDriver: false,
      }).start();
    },
  };

  const drawerHeight = React.useRef(new Animated.Value(0)).current;
  const moveStartY = React.useRef(0);
  const drawer = {
    drawerHeight,
    moveStartY,
    setMoveStartY: (Y: number) => {
      moveStartY.current = Y;
    },
    openDrawer: (onStart?: () => void, onComplete?: () => void) => {
      onStart && onStart();
      Animated.timing(drawerHeight, {
        toValue: MAX_DRAW_HEIGHT,
        useNativeDriver: false,
      }).start(({ finished }) =>
        finished && onComplete ? onComplete() : null,
      );
    },
    closeDrawer: (onStart?: () => void, onComplete?: () => void) => {
      onStart && onStart();
      Animated.timing(drawerHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start(({ finished }) =>
        finished && onComplete ? onComplete() : null,
      );
    },
  };

  return (
    <SlideViewContext.Provider
      value={{
        state,
        update: { setShowOtoscope, setIsDiagnosed },
        movableYContainer,
        drawer,
      }}>
      {children}
    </SlideViewContext.Provider>
  );
};

/**
 * useSlideViewState
 * Hook for consuming the SlideViewContext (must use inside SlideViewProvider).
 */
export const useSlideViewState = () => {
  const context = React.useContext(SlideViewContext);
  if (!context) {
    throw new Error('Context hook used outside of provider!');
  } else {
    return context;
  }
};
