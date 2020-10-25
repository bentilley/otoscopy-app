/** @format */

module.exports = {
  verbose: true,
  preset: 'react-native',
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!' +
      '(jest-)?react-native' +
      '|react-navigation' +
      '|react-navigation-redux-helpers' +
      '|@react-navigation/.*' +
      '|@react-native-firebase/.*' +
      ')',
  ],
};
