/** @format */

import React from 'react';
import Menu from '../index';
import { render, fireEvent } from '@testing-library/react-native';

let navigationStubs: {
  goToReference: () => void;
  goToFavourites: () => void;
  goToBrowse: () => void;
};

beforeEach(() => {
  navigationStubs = {
    goToReference: jest.fn(),
    goToFavourites: jest.fn(),
    goToBrowse: jest.fn(),
  };
});

describe('<Menu />', () => {
  it('renders correctly', () => {
    const { queryByText } = render(<Menu {...navigationStubs} />);
    expect(queryByText('Menu')).toBeTruthy();
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
});
