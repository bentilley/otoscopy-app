module.exports = {
  verbose: true,
  // preset: 'react-native',
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation|react-navigation-redux-helpers|@react-navigation/.*)',
  ],
};
