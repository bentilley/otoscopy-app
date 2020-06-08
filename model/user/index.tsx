/**
 * @format
 */

import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { checkIfInvalidContext } from 'utils';

/**
 * User
 * Extension of the Firebase User with the email defined.
 */
interface User extends FirebaseAuthTypes.User {
  email: string;
}

interface ContextInterface {
  user: FirebaseAuthTypes.User | null;
  initialising: boolean;
  authErrorMsg: string | null;
  getUserSafe: () => User;
  createUser: (email: string, password: string, position: string) => void;
  loginUser: (email: string, password: string) => void;
  signoutUser: () => void;
  resetAuthError: () => void;
}

export const UserContext = React.createContext<ContextInterface | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const [initialising, setInitialising] = React.useState(true);
  const [authErrorMsg, setAuthErrorMsg] = React.useState<string | null>(null);

  const onAuthStateChanged = useAuthStateCallback(setUser, setInitialising);
  React.useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  const state = getStateAndSelectors(user, initialising, authErrorMsg);
  const useCases = getUseCases(setAuthErrorMsg);

  return (
    <UserContext.Provider value={{ ...state, ...useCases }}>
      {children}
    </UserContext.Provider>
  );
};

type SetFunc<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * useAuthStateCallback
 * Callback for when the Firebase auth state changes.
 * @param setUser - React function to update the user state variable.
 * @param setInitialising - React function to update the initialising variable.
 */
const useAuthStateCallback = (
  setUser: SetFunc<FirebaseAuthTypes.User | null>,
  setInitialising: SetFunc<boolean>,
) => {
  return React.useCallback(
    (userData: FirebaseAuthTypes.User | null) => {
      setUser(userData);
      setInitialising(false);
    },
    [setUser, setInitialising],
  );
};

/**
 * getStateAndSelectors
 * Compile the state and selectors to make available in this context.
 * @param user - The response from the Firebase auth state change.
 * @param initialising - Whether or not the Firebase auth call has returned.
 * @param authErrorMsg - Human readable error message from the auth call.
 */
const getStateAndSelectors = (
  user: FirebaseAuthTypes.User | null,
  initialising: boolean,
  authErrorMsg: string | null,
) => {
  return {
    user,
    initialising,
    authErrorMsg,
    getUserSafe: () => {
      if (user?.email) {
        return user as User;
      } else {
        throw new RangeError("A signed in user's email address is undefined.");
      }
    },
  };
};

/**
 * getUseCases
 * Compile the different use cases (actions) made available by this context.
 * @param setAuthErrorMsg - React function to update the authErrorMsg variable.
 */
const getUseCases = (setAuthErrorMsg: SetFunc<string | null>) => {
  const handleAuthError = getAuthErrorHandler(setAuthErrorMsg);
  return {
    createUser: (email: string, password: string, position: string) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          firestore()
            .collection('users')
            .doc(user.uid)
            .set({ email, position });
        })
        .catch(handleAuthError);
    },
    loginUser: (email: string, password: string) => {
      auth().signInWithEmailAndPassword(email, password).catch(handleAuthError);
    },
    signoutUser: () => auth().signOut(),
    resetAuthError: () => setAuthErrorMsg(null),
  };
};

interface AuthError {
  code: string;
}

/**
 * getAuthErrorHandler
 * Create a handler to convert Firebase auth codes into human readable strings.
 * @param setAuthErrorMsg - React function to update the authErrorMsg variable.
 */
const getAuthErrorHandler = (setAuthErrorMsg: SetFunc<string | null>) => (
  error: AuthError,
) => {
  if (error.code === 'auth/email-already-in-use') {
    setAuthErrorMsg('That email address is already in use');
  }
  if (error.code === 'auth/invalid-email') {
    setAuthErrorMsg('That email address is invalid');
  }
  if (error.code === 'auth/weak-password') {
    setAuthErrorMsg('The given password is invalid or too weak');
  }
  if (error.code === 'auth/wrong-password') {
    setAuthErrorMsg('The given password is incorrect');
  }
  if (error.code === 'auth/user-not-found') {
    setAuthErrorMsg('There is no account for this email address');
  }
  console.log(error);
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  checkIfInvalidContext<ContextInterface>(context);
  return context as ContextInterface;
};

export { useFavourite } from './useFavourite';
