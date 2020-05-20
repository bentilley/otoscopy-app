/** @format */

import React from 'react';
import App from '../App';

import { render, cleanup } from '@testing-library/react-native';

afterEach(cleanup);

describe('<App />', () => {
  it('renders correctly on the menu screen', () => {
    const { getByText, getAllByText } = render(<App />);

    expect(getAllByText('Otoscopy App')).toBeTruthy();
    expect(getByText('Conditions')).toBeTruthy();
    expect(getByText('Favourites')).toBeTruthy();
    expect(getByText('Random Browse')).toBeTruthy();
  });
});
