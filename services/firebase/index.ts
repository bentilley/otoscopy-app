/** @format */

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// Auth Helpers

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
  return auth().signOut();
}

// Storage Helpers

export async function getDownloadURL(firebaseRef: string): Promise<string> {
  return storage().ref(firebaseRef).getDownloadURL();
}
