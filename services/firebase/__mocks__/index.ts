/** @format */

import { categories } from "model/condition/__mocks__/categories.data";
import { condition } from "model/condition/__mocks__/condition.data";
import { favourites } from "model/condition/__mocks__/favourites.data";

// Auth

let AUTH_CALLBACK: (user: any) => void;

const USER_DATA = {
  displayName: null,
  email: "doctor@hospital.uk",
  emailVerified: false,
  isAnonymous: false,
  metadata: { creationTime: 1591630985296, lastSignInTime: 1609695638994 },
  phoneNumber: null,
  photoURL: null,
  providerData: [[Object]],
  providerId: "firebase",
  refreshToken: "refreshToken",
  uid: "randomUid",
};

export const setupAuthStateChangeHandler = (handler: (user: any) => void) => {
  AUTH_CALLBACK = handler;
};

export const signInUser = () => {
  return Promise.resolve(AUTH_CALLBACK(USER_DATA));
};

// Storage

export const getDownloadURL = jest.fn(() => {
  return Promise.resolve("www.example.com/img");
});

// Firestore

export const db = {
  getCategories: jest.fn(async () => categories),
  getCondition: jest.fn(async () => condition),
  getSlidesForCondition: jest.fn(() => []),
  watchUserFavourites: jest.fn(
    async (_: any, onChange: (data: any) => void) => {
      onChange(favourites);
    },
  ),
  addFavourite: jest.fn(),
  deleteFavourite: jest.fn(),
};
