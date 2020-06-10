/** @format */

import React from 'react';
import { ConditionSlideList } from '../index';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { slideData } from 'components/ConditionSlideList/__mocks__/slide-data';
import { Slide } from 'model/condition/types';

// This is a fix for a TouchableOpacity bug - see
// https://github.com/testing-library/native-testing-library/issues/113 to see
// if there is a fix yet and this can be removed
jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);

let navigationStubs: {
  goToSlide: () => void;
  goToCondition: () => void;
};

let props: {
  slides: { [slideId: string]: Slide };
} = {
  slides: slideData,
};

beforeEach(() => {
  navigationStubs = {
    goToSlide: jest.fn(),
    goToCondition: jest.fn(),
  };

  props.slides = slideData;
});

afterEach(cleanup);

describe('<ConditionSlideList />', () => {
  it('renders correctly', () => {
    const { queryAllByText } = render(
      <ConditionSlideList {...navigationStubs} {...props} />,
    );
    expect(queryAllByText('view slide').length).toEqual(3);
  });

  it('navigates to the correct slide when the slide is pressed', () => {
    const { getAllByText } = render(
      <ConditionSlideList {...navigationStubs} {...props} />,
    );
    const btns = getAllByText('view slide');
    expect(btns.length).toEqual(3);
    fireEvent.press(btns[0]);
    expect(navigationStubs.goToSlide).toHaveBeenCalledWith(
      expect.objectContaining({ condition: 'Otitis Media' }),
    );
  });
});
