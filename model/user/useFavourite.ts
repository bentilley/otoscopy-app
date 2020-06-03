/** @format */

import React from 'react';

export const useFavourite = (slideId: string): [boolean, () => void] => {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const toggleFavourite = () => setIsFavourite(!isFavourite);
  return [isFavourite, toggleFavourite];
};
