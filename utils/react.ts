/** @format */

import React from 'react';

export const checkIfInvalidContext = <T>(
  context: T | null | undefined,
): void => {
  if (context === undefined) {
    throw new Error('Probably not in Provider!');
  }
  if (context === null) {
    throw new Error('Using context before it is instantiated!');
  }
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export const useSimpleUpdater = <T>(key: string, setState: SetState<T>) => {
  return React.useCallback(
    (value: number) =>
      setState((prevState: T) => ({ ...prevState, [key]: value })),
    [key, setState],
  );
};
