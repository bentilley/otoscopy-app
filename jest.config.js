/** @format */

module.exports = {
  verbose: true,
  preset: "react-native",
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["./.jest/setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!" +
      "(jest-)?react-native" +
      "|@react-navigation" +
      "|@react-native-firebase/.*" +
      "|@react-native-community" +
      "|@sentry/react-native" +
      ")",
  ],
};
