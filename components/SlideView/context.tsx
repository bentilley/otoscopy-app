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
 * @param slideIndex - The index of the slide from the slidePool to show.
 */
type State = {
  showOtoscope: boolean;
  isDiagnosed: boolean;
  slideIndex: number;
  numSlides: number;
};

interface Context {
  state: State;
  update: {
    setShowOtoscope: (b: boolean) => void;
    setIsDiagnosed: (b: boolean) => void;
    setSlideIndex: (b: number) => void;
    incrementSlideIndex: () => void;
    setNumSlides: (b: number) => void;
  };
  movableContainer: {
    translation: Animated.ValueXY;
    moveYTo: (Y: number) => void;
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

interface Props {
  totalNumberOfSlides: number;
  startingIndex: number;
}

/**
 * SlideViewProvider
 * Provider component for the SlideView context state.
 * @param totalNumberOfSlides - Total number of slides that the view that show.
 * @param startingIndex - Index of the slide for the view to start on.
 * @param children - Child react components.
 */
export const SlideViewProvider: React.FC<Props> = ({
  totalNumberOfSlides,
  startingIndex,
  children,
}) => {
  const [showOtoscope, setShowOtoscope] = React.useState(false);
  const [isDiagnosed, setIsDiagnosed] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(startingIndex);
  const [numSlides, setNumSlides] = React.useState(totalNumberOfSlides);

  const incrementSlideIndex = React.useCallback(() => {
    const nextIndex = slideIndex + 1;
    if (nextIndex < numSlides) {
      setSlideIndex(nextIndex);
    } else {
      setSlideIndex(0);
    }
  }, [slideIndex, numSlides]);

  const state = { showOtoscope, isDiagnosed, slideIndex, numSlides };
  const update = {
    setShowOtoscope,
    setIsDiagnosed,
    setSlideIndex,
    setNumSlides,
    incrementSlideIndex,
  };

  const translation = React.useRef(new Animated.ValueXY()).current;
  const movableContainer = {
    translation,
    moveYTo: (Y: number) => {
      Animated.timing(translation.y, {
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
      value={{ state, update, movableContainer, drawer }}>
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
