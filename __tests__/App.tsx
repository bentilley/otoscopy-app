/** @format */

import React from 'react';
import App from '../App';

import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const { getByText } = render(<App />);

  expect(getByText('Hello')).toBeTruthy();
});
