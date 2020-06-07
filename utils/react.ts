/** @format */

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
