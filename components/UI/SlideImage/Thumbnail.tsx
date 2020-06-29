/** @format */

import React from 'react';
import { SlideImage } from './index';

type Props = {
  size: number;
  slideId: string;
};

/**
 * Thumbnail
 * A small square image to view a slide preview.
 * @param size - the width and height of the image;
 * @param slideId - the ID of the slide whose image to display.
 */
export const Thumbnail: React.FC<Props> = ({ size, slideId }) => {
  return (
    <SlideImage
      firebaseRef={`/thumb/${slideId}.jpg`}
      width={size}
      height={size}
    />
  );
};
