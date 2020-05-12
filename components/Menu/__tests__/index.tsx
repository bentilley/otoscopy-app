import React from 'react';
import { Menu } from '../index';
import { render } from '@testing-library/react-native';

describe('<Menu />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Menu />);
    expect(getByText('Hello')).toBeTruthy();
  });
});
