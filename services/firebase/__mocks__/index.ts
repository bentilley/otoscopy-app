/** @format */

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

export const getDownloadURL = jest.fn(() => {
  return Promise.resolve("www.example.com/img");
});