/** @format */

import React from "react";
import { Animated } from "react-native";
import { useMaxDrawerHeight } from "./dimensions";

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
    setNumSlides: (b: number) => void;
    incrementSlideIndex: () => void;
    decrementSlideIndex: () => void;
  };
  movableContainer: {
    translation: Animated.ValueXY;
    moveYTo: (Y: number) => void;
    setY: (Y: number) => void;
  };
  drawer: {
    drawerHeight: Animated.Value;
    moveStartY: React.MutableRefObject<number>;
    setMoveStartY: (Y: number) => void;
    openDrawer: (onStart?: () => void, onComplete?: () => void) => void;
    closeDrawer: (onStart?: () => void, onComplete?: () => void) => void;
    setHeight: (height: number) => void;
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
  const maxDrawerHeight = useMaxDrawerHeight();

  const incrementSlideIndex = React.useCallback(() => {
    const nextIndex = slideIndex + 1;
    if (nextIndex < numSlides) {
      setSlideIndex(nextIndex);
    } else {
      setSlideIndex(0);
    }
  }, [slideIndex, numSlides]);
  const decrementSlideIndex = React.useCallback(() => {
    const nextIndex = slideIndex - 1;
    if (nextIndex >= 0) {
      setSlideIndex(nextIndex);
    } else {
      setSlideIndex(numSlides - 1);
    }
  }, [slideIndex, numSlides]);

  const state = { showOtoscope, isDiagnosed, slideIndex, numSlides };
  const update = {
    setShowOtoscope,
    setIsDiagnosed,
    setSlideIndex,
    setNumSlides,
    incrementSlideIndex,
    decrementSlideIndex,
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
    setY: (Y: number) => translation.y.setValue(Y),
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
        toValue: maxDrawerHeight,
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
    setHeight: (height: number) => drawerHeight.setValue(height),
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
    throw new Error("Context hook used outside of provider!");
  } else {
    return context;
  }
};
