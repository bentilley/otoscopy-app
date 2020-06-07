/**
 * @format
 */

import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { checkIfInvalidContext } from 'utils';

interface UserContextInterface {
  user: FirebaseAuthTypes.User | null;
  setUser: { (newUser: FirebaseAuthTypes.User | null): void };
}

export const UserContext = React.createContext<UserContextInterface | null>(
  null,
);

type Props = {
  children: JSX.Element;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  const [initialising, setInitialising] = React.useState(true);

  const onAuthStateChanged = React.useCallback(
    (userData: FirebaseAuthTypes.User | null) => {
      console.log('auth state changed');
      setUser(userData);
      if (initialising) {
        setInitialising(false);
      }
    },
    [initialising],
  );

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  checkIfInvalidContext<UserContextInterface>(context);
  return context as UserContextInterface;
};

export { useFavourite } from './useFavourite';
