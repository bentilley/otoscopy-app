/** @format */

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./resources/fonts/'],
};

/*
 * I got this config from here: https://stackoverflow.com/a/57635913/10916478
 *
 * This folder seems to get linked when you run `react-native link` - so don't
 * forget you might have to re-run that command if you are fiddling around with
 * this.
 *
 * Linking resulted in an iOS build error cause by having multiple copies of
 * some fonts available. This was fixed by removing the superfluous
 * instructions in "Copy Bundle Resources" - see
 * https://github.com/oblador/react-native-vector-icons/issues/1074#issuecomment-534027196
 */
