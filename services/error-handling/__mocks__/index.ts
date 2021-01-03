/** @format */

import { useCallback } from "react";

export { ErrorHandlingProvider } from "./provider";

export const useErrorHandling = () =>
  // use a callback so that we don't get into render loops by always returning a
  // different function... oops!
  useCallback(
    () =>
      jest.fn(() => ({
        logError: jest.fn(),
      })),
    [],
  );

export const setUpSentry = jest.fn();

export default {};
