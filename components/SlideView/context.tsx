/** @format */

import React from 'react';

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
  return (
    <SlideViewContext.Provider
      value={{ state, update: { setShowOtoscope, setIsDiagnosed } }}>
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
