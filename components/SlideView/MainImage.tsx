/** @format */

import React from 'react';
import { SlideImage } from 'components/UI';
import { OTOSCOPE_BOUNDARY_RADIUS } from './dimensions';

type Props = {
  firebaseRef: string;
};

/**
 * MainImage
 * The central image for each slide.
 * @param firebaseRef - firebase storage path used to create the ref.
 */
export const MainImage: React.FC<Props> = ({ firebaseRef }) => {
  return (
    <SlideImage
      firebaseRef={firebaseRef}
      width={OTOSCOPE_BOUNDARY_RADIUS * 2}
      height={OTOSCOPE_BOUNDARY_RADIUS * 2}
      loaderSize="large"
    />
  );
};
