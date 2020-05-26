/** @format */

import React from 'react';
import SlideList from '../index';
import { render, fireEvent, cleanup } from '@testing-library/react-native';

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

let slides: { id: string }[];

beforeEach(() => {
  navigationStubs = {
    goToSlide: jest.fn(),
  };

  slides = [
    {
      condition: 'Otitis Media',
      diagnosis: 'Right ear Acute Otitis Media.',
      thumbnail_url: '/thumb/otitis-media/100001.jpg',
    },
    {
      condition: 'Otitis Media',
      diagnosis: 'Right ear Acute Otitis Media.',
      thumbnail_url: '/thumb/otitis-media/100001.jpg',
    },
    {
      condition: 'Otitis Media',
      diagnosis: 'Right ear Acute Otitis Media.',
      thumbnail_url: '/thumb/otitis-media/100001.jpg',
    },
  ];
});

afterEach(cleanup);

describe('<SlideList />', () => {
  it('renders correctly', () => {
    const { queryAllByText } = render(
      <SlideList {...navigationStubs} slides={slides} />,
    );
    expect(queryAllByText('view slide').length).toEqual(3);
  });

  it('renders loading if there is no slide info', () => {
    const { queryByText } = render(
      <SlideList {...navigationStubs} slides={slides} />,
    );
    expect(queryByText('Loading...')).toBeTruthy();
  });

  it('navigates to the correct slide when the slide is pressed', () => {
    const { getByText } = render(
      <SlideList {...navigationStubs} slides={slides} />,
    );
    const btn = getByText('view slide');
    fireEvent.press(btn);
    expect(navigationStubs.goToSlide).toHaveBeenCalledWith('Otitis Media');
  });
});
