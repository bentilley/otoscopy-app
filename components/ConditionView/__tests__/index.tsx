/** @format */

import React from 'react';
import ConditionView from '../index';
import { render, fireEvent, cleanup } from '@testing-library/react-native';

// This is a fix for a TouchableOpacity bug - see
// https://github.com/testing-library/native-testing-library/issues/113 to see
// if there is a fix yet and this can be removed
jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);

jest.mock('model/condition', () => ({
  useConditions: () => ({
    getCondition: (conditionId: string | null) => {
      if (conditionId !== 'null') {
        return {
          name: 'Otitis Media',
          description: 'Acute onset inflamation of the middle ear space',
          population: ['Commonly paediatric 3-7 years'],
          aetiology: {
            bacterial: {
              information: [
                'Strep Pneumoniae',
                'Haemophilus',
                'Moraxella Catarrhalis',
              ],
              title: 'Bacterial',
            },
            viral: {
              information: ['Rhinovirus', 'RSV', 'Adenovirus'],
              title: 'Viral (75% cases)',
            },
          },
        };
      } else {
        return null;
      }
    },
  }),
}));

let navigationStubs: {
  goToSlides: () => void;
};

let condition: {
  id: string;
  name: string;
};

beforeEach(() => {
  navigationStubs = {
    goToSlides: jest.fn(),
  };

  condition = { name: 'Otitis Media', id: 'otitis' };
});

afterEach(cleanup);

describe('<ConditionView />', () => {
  it('renders correctly', () => {
    const { queryByText } = render(
      <ConditionView {...navigationStubs} condition={condition} />,
    );
    expect(
      queryByText('Acute onset inflamation of the middle ear space'),
    ).toBeTruthy();
  });

  it('renders loading if there is no condition info', () => {
    condition.id = 'null';
    const { queryByText } = render(
      <ConditionView {...navigationStubs} condition={condition} />,
    );
    expect(queryByText('Loading...')).toBeTruthy();
  });

  it('navigates to the slide view when the slide button is pressed', () => {
    const { getByTestId } = render(
      <ConditionView {...navigationStubs} condition={condition} />,
    );
    const btn = getByTestId('view-slides-btn');
    fireEvent.press(btn);
    expect(navigationStubs.goToSlides).toHaveBeenCalled();
  });
});
