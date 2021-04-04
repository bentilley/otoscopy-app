/** @format */

import React from "react";
import { SlideImage } from "components/UI";

type Props = {
  size: number;
  firebaseRef: string;
};

/**
 * MainImage
 * The central image for each slide.
 * @param size - the width and height of the square image;
 * @param firebaseRef - firebase storage path used to create the ref.
 */
export const MainImage: React.FC<Props> = ({ size, firebaseRef }) => {
  return (
    <SlideImage
      firebaseRef={firebaseRef}
      width={size}
      height={size}
      loaderSize="large"
    />
  );
};
