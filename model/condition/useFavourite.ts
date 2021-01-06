/** @format */

import { useConditions, useConditionsActions } from "./context";

export const useFavourite = (slideId: string): [boolean, () => void] => {
  const { isFavourite } = useConditions();
  const { addToFavourites, removeFromFavourites } = useConditionsActions();

  const isSlideFavourite = isFavourite(slideId);
  const toggleFavourite = () =>
    isSlideFavourite ? removeFromFavourites(slideId) : addToFavourites(slideId);

  return [isSlideFavourite, toggleFavourite];
};
