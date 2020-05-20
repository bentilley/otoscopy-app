/** @format */

import React from 'react';
import Reference from '../index';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { Condition } from 'model/condition';

// This is a fix for a TouchableOpacity bug - see
// https://github.com/testing-library/native-testing-library/issues/113 to see
// if there is a fix yet and this can be removed
jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);

jest.mock('model/condition', () => ({
  useConditions: () => ({
    categories: [
      {
        name: 'Diseases of the middle ear',
        conditions: [
          { name: 'Otitis Media', id: 'AA' },
          { name: 'Hurty Drum', id: 'AB' },
        ],
      },
      {
        name: 'Benitis of the ears',
        conditions: [{ name: 'Banging Ben Bones', id: 'BA' }],
      },
      {
        name: 'Olly Earholes',
        conditions: [{ name: 'Octagon ear Ollifilus', id: 'CA' }],
      },
    ],
  }),
}));

let navigationStubs: {
  goToCondition: (condition: Condition) => void;
};

beforeEach(() => {
  navigationStubs = {
    goToCondition: jest.fn(),
  };
});

afterEach(cleanup);

describe('<Reference />', () => {
  it('renders correctly', () => {
    const { queryByText } = render(<Reference {...navigationStubs} />);
    expect(queryByText('Diseases of the middle ear')).toBeTruthy();
    expect(queryByText('Benitis of the ears')).toBeTruthy();
    expect(queryByText('Olly Earholes')).toBeTruthy();
  });

  it('responds to category touch', async () => {
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
    expect(navigationStubs.goToCondition).toHaveBeenCalledWith({
      id: 'BA',
      name: 'Banging Ben Bones',
    });
  });
});
