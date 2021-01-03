/** @format */

export const useConditions = jest.fn(() => ({
  isFavourite: jest.fn(() => false),
}));

export const useConditionsActions = jest.fn(() => ({
  removeFromFavourites: jest.fn(),
  addToFavourites: jest.fn(),
}));

export const useFavourite = jest.fn(() => [false, jest.fn()]);

export default {};
