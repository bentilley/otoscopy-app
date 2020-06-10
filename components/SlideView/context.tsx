/** @format */

import React from 'react';
import { Animated } from 'react-native';
import { useSimpleUpdater } from 'utils';

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
    slideIndex: 0,
    numSlides: 0,
  });

  const setShowOtoscope = useSimpleUpdater<State>('showOtoscope', setState);
  const setIsDiagnosed = useSimpleUpdater<State>('isDiagnosed', setState);
  const setSlideIndex = useSimpleUpdater<State>('slideIndex', setState);
  const setNumSlides = useSimpleUpdater<State>('numSlides', setState);
  const { slideIndex, numSlides } = state;
  const incrementSlideIndex = React.useCallback(() => {
    const nextIndex = slideIndex + 1;
    if (nextIndex < numSlides) {
      setState((prevState) => ({ ...prevState, slideIndex: nextIndex }));
    } else {
      setState((prevState) => ({ ...prevState, slideIndex: 0 }));
    }
  }, [slideIndex, numSlides]);
  const update = React.useMemo(
    () => ({
      setShowOtoscope,
      setIsDiagnosed,
      setSlideIndex,
      setNumSlides,
      incrementSlideIndex,
    }),
    [
      setShowOtoscope,
      setIsDiagnosed,
      setSlideIndex,
      setNumSlides,
      incrementSlideIndex,
    ],
  );

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
      value={{ state, update, movableYContainer, drawer }}>
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
