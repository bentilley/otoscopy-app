/** @format */

import { categories } from "model/condition/__mocks__/categories.data";
import { conditions } from "model/condition/__mocks__/condition.data";
import { favourites } from "model/condition/__mocks__/favourites.data";
import { slides } from "model/condition/__mocks__/slides.data";

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

export const sendPasswordReset = () => {
  return Promise.resolve();
};

// Storage

export const getDownloadURL = jest.fn(() => {
  return Promise.resolve("www.example.com/img");
});

// Firestore

type MapOptions = "condition1" | "condition2" | "doesntExist";
const CONDITION_DATA_MAP: { [key: string]: MapOptions } = {
  REtPLgJs8ACPVBV0e734: "condition1",
  hRdbn6dgLMyKlDMSsvgb: "condition1",
  OWLvLPY3hktUg5PDBuU5: "condition1",
  blankCondition: "doesntExist",
  externalLinkCondition: "condition2",
};

export const db = {
  getCategories: jest.fn(async () => categories),
  getCondition: jest.fn(async (c) => conditions[CONDITION_DATA_MAP[c]]),
  getSlidesForCondition: jest.fn(() => slides),
  watchUserFavourites: jest.fn(
    async (_: any, onChange: (data: any) => void) => {
      onChange(favourites);
    },
  ),
  addFavourite: jest.fn(),
  deleteFavourite: jest.fn(),
  submitFeedback: jest.fn(),
};
