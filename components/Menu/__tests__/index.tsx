/** @format */

import React from 'react';
import { Menu } from '../index';
import { render, fireEvent } from '@testing-library/react-native';

// This is a fix for a TouchableOpacity bug - see
// https://github.com/testing-library/native-testing-library/issues/113 to see
// if there is a fix yet and this can be removed
jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);

let navigationStubs: {
  goToReference: () => void;
  goToFavourites: () => void;
  goToBrowse: () => void;
  signoutUser: () => void;
};

beforeEach(() => {
  navigationStubs = {
    goToReference: jest.fn(),
    goToFavourites: jest.fn(),
    goToBrowse: jest.fn(),
    signoutUser: jest.fn(),
  };
});

describe('<Menu />', () => {
  it('renders correctly', () => {
    const { queryByText } = render(<Menu {...navigationStubs} />);
    expect(queryByText('Otoscopy App')).toBeTruthy();
  });

  it('navigates to the Reference menu', () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText('Conditions');
    fireEvent.press(btn);
    expect(navigationStubs.goToReference).toHaveBeenCalled();
  });

  it('navigates to the Favourites menu', () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText('Favourites');
    fireEvent.press(btn);
    expect(navigationStubs.goToFavourites).toHaveBeenCalled();
  });

  it('navigates to the Slide screen on random browse', () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText('Random Browse');
    fireEvent.press(btn);
    expect(navigationStubs.goToBrowse).toHaveBeenCalled();
  });

  it('signs out the user', () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText('Sign Out');
    fireEvent.press(btn);
    expect(navigationStubs.signoutUser).toHaveBeenCalled();
  });
});
