/**
 * @format
 */

import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { checkIfInvalidContext } from 'utils';

interface ContextInterface {
  user: FirebaseAuthTypes.User | null;
  initialising: boolean;
  authErrorMsg: string | null;
  createUser: (email: string, password: string) => void;
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

  const useCases = getUseCases(setAuthErrorMsg);

  return (
    <UserContext.Provider
      value={{ user, initialising, authErrorMsg, ...useCases }}>
      {children}
    </UserContext.Provider>
  );
};

type SetFunc<T> = React.Dispatch<React.SetStateAction<T>>;

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

const getUseCases = (setAuthErrorMsg: SetFunc<string | null>) => {
  const handleAuthError = getAuthErrorHandler(setAuthErrorMsg);
  return {
    createUser: (email: string, password: string) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
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
  console.log(error);
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  checkIfInvalidContext<ContextInterface>(context);
  return context as ContextInterface;
};

export { useFavourite } from './useFavourite';
