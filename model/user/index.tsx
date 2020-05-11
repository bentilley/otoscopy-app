/**
 * @format
 */

import React from 'react';

interface UserContextInterface {
  user: string;
  setUser: { (newUser: string): void };
}

export const UserContext = React.createContext<UserContextInterface>({
  user: '',
  setUser: () => {},
});

type Props = {
  children: JSX.Element;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState('Olly');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
