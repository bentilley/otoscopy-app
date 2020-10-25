/** @format */

export { ErrorHandlingProvider } from './provider';

export const useErrorHandling = jest.fn(() => ({
  logError: jest.fn(),
}));

export const setUpSentry = jest.fn();

export default {};
