/** @format */

import React from 'react';
import { SlideImage } from 'components/UI/SlideImage';

type Props = {
  slideId: string;
};

export const Thumbnail: React.FC<Props> = ({ slideId }) => {
  return (
    <SlideImage
      firebaseRef={`/thumb/${slideId}.jpg`}
      width={110}
      height={110}
    />
  );
};
