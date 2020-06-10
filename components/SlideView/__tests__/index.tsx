/** @format */

import React from 'react';
import { SlideView } from '../index';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { slideData } from 'components/ConditionSlides/__mocks__/slide-data';
import { Slide } from 'model/condition/types';

// This is a fix for a TouchableOpacity bug - see
// https://github.com/testing-library/native-testing-library/issues/113 to see
// if there is a fix yet and this can be removed
jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);

let navigationStubs: {
  goToCondition: () => void;
  goToNextSlide: () => void;
};

let props: { slide: Slide } = { slide: slideData[0] };

beforeEach(() => {
  navigationStubs = {
    goToCondition: jest.fn(),
    goToNextSlide: jest.fn(),
  };

  props.slide = slideData[0];
});

afterEach(cleanup);

describe('<SlideView />', () => {
  it('renders correctly', () => {
    const { queryAllByText } = render(
      <SlideView {...navigationStubs} {...props} />,
    );
    expect(queryAllByText('view slide').length).toEqual(3);
  });
});
