/** @format */

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import {
  Category,
  // ConditionHead,
  ConditionDataDB,
  SlideDataDB,
  FavouriteDataDB,
  Slide,
} from "model/condition/types";

// Auth

export async function setupAuthStateChangeHandler(
  handler: (userData: FirebaseAuthTypes.User | null) => void,
) {
  return auth().onAuthStateChanged(handler);
}

export async function createUser(
  email: string,
  password: string,
  position: string,
) {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      firestore().collection("users").doc(user.uid).set({ email, position });
    });
}

export async function signInUser(email: string, password: string) {
  return auth().signInWithEmailAndPassword(email, password);
}

export async function signOutCurrentUser() {
  userSubscribers.forEach((sub) => sub());
  return auth().signOut();
}

// Storage

export async function getDownloadURL(firebaseRef: string): Promise<string> {
  return storage().ref(firebaseRef).getDownloadURL();
}

// Firestore

const userSubscribers: { (): void }[] = [];

export const db = {
  userSubscribers,
  getCategories: async () => {
    // TODO Set up Sentry error logging for categories firebase call
    const query = await firestore().collection("categories").get();
    return query.docs.map((doc) => doc.data()) as Category[];
  },

  getCondition: async (id: string) => {
    // TODO Set up Sentry error logging for condition firebase call
    const doc = await firestore().collection("conditions").doc(id).get();
    const conditionData = doc.data() as ConditionDataDB;
    return { ...conditionData, id: doc.id };
  },

  getSlidesForCondition: async (conditionId: string) => {
    // TODO Set up Sentry error logging for slide firebase call
    const conditionDoc = firestore().collection("conditions").doc(conditionId);
    const slideCollection = await conditionDoc.collection("slides").get();
    return slideCollection.docs.map((doc) => {
      const slideData = doc.data() as SlideDataDB;
      return { ...slideData, id: doc.id, conditionId: conditionId };
    });
  },

  addFavourite: (userUid: string, slide: Slide) => {
    const userDoc = firestore().collection("users").doc(userUid);
    userDoc.collection("favourites").doc(slide.id).set(slide);
  },

  deleteFavourite: (userUid: string, slideId: string) => {
    const userDoc = firestore().collection("users").doc(userUid);
    userDoc.collection("favourites").doc(slideId).delete();
  },

  watchUserFavourites: async (
    userUid: string,
    onChange: (favourites: Slide[]) => void,
  ) => {
    // TODO Set up Sentry error logging for user favourites firebase call
    const userCollection = firestore().collection("users");
    const userFavourites = userCollection.doc(userUid).collection("favourites");
    const subscriber = userFavourites.onSnapshot(({ docs }) => {
      // TODO Unsubscribe from this when no longer needed - i.e. user logs out
      const favourites = docs.map((doc) => {
        const slideData = doc.data() as FavouriteDataDB;
        return { ...slideData, id: doc.id };
      });
      onChange(favourites);
    });
    userSubscribers.push(subscriber);
  },
};
