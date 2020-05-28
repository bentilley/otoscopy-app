/** @format */

import React from 'react';
import SlideList from '../index';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { slideData } from 'components/SlideList/__mocks__/slide-data';
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
};

let props: {
  slides: Slide[];
  isFavourites: boolean;
} = {
  slides: slideData,
  isFavourites: false,
};

beforeEach(() => {
  navigationStubs = {
    goToSlide: jest.fn(),
  };

  props.slides = slideData;
  props.isFavourites = false;
});

afterEach(cleanup);

describe('<SlideList />', () => {
  it('renders correctly', () => {
    const { queryAllByText } = render(
      <SlideList {...navigationStubs} {...props} />,
    );
    expect(queryAllByText('view slide').length).toEqual(3);
  });

  it('navigates to the correct slide when the slide is pressed', () => {
    const { getAllByText } = render(
      <SlideList {...navigationStubs} {...props} />,
    );
    const btns = getAllByText('view slide');
    expect(btns.length).toEqual(3);
    fireEvent.press(btns[0]);
    expect(navigationStubs.goToSlide).toHaveBeenCalledWith(
      expect.objectContaining({ condition: 'Otitis Media' }),
    );
  });

  it('shows favourites view is isFavourites is true', () => {
    props.isFavourites = true;
    const { queryAllByText } = render(
      <SlideList {...navigationStubs} {...props} />,
    );
    expect(queryAllByText('Otitis Media').length).toEqual(3);
    expect(queryAllByText('remove').length).toEqual(3);
  });
});
