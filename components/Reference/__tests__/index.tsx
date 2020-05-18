/** @format */

import React from 'react';
import Reference from '../index';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('model/condition', () => ({
  useConditions: () => ({
    categories: [
      {
        name: 'Diseases of the middle ear',
        conditions: [{ name: 'Otitis Media' }, { name: 'Hurty Drum' }],
      },
      {
        name: 'Benitis of the ears',
        conditions: [{ name: 'Banging Ben Bones' }],
      },
      {
        name: 'Olly Earholes',
        conditions: [{ name: 'Octagon ear Ollifilus' }],
      },
    ],
  }),
}));

let navigationStubs: {
  goToCondition: (condition: string) => void;
};

describe('<Reference />', () => {
  it('renders correctly', () => {
    const { queryByText } = render(<Reference {...navigationStubs} />);
    expect(queryByText('Reference')).toBeTruthy();
    expect(queryByText('Diseases of the middle ear')).toBeTruthy();
    expect(queryByText('Benitis of the ears')).toBeTruthy();
    expect(queryByText('Olly Earholes')).toBeTruthy();
  });

  it('responds to category touch', () => {
    const { getByText, queryByText } = render(
      <Reference {...navigationStubs} />,
    );
    const category = getByText('Diseases of the middle ear');
    fireEvent.press(category);
    expect(queryByText('Otitis Media')).toBeTruthy();
    expect(queryByText('Hurty Drum')).toBeTruthy();
  });

  it('responds to multiple category touches', () => {
    const { getByText, queryByText } = render(
      <Reference {...navigationStubs} />,
    );
    const category = getByText('Benitis of the ears');
    fireEvent.press(category);
    expect(queryByText('Banging Ben Bones')).toBeTruthy();
    const category2 = getByText('Olly Earholes');
    fireEvent.press(category2);
    expect(queryByText('Octagon ear Ollifilus')).toBeTruthy();
  });

  it('responds to condition touch with relevant navigation', () => {
    const { getByText } = render(<Reference {...navigationStubs} />);
    const category = getByText('Benitis of the ears');
    fireEvent.press(category);
    const condition = getByText('Banging Ben Bones');
    fireEvent.press(condition);
    expect(navigationStubs.goToCondition).toHaveBeenCalledWith(
      'Banging Ben Bones',
    );
  });
});
