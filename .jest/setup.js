/** @format */

// Copied from https://reactnavigation.org/docs/testing/
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the
// native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

// Mock the Linking module for tests
jest.mock("react-native/Libraries/Linking/Linking.js", () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});