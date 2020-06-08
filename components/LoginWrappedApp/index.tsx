/** @format */

import React from 'react';
import { AppScreens } from 'components/screens';
import { LoginScreen } from 'components/screens/LoginScreen';
import { useUser } from 'model/user';

export const LoginWrappedApp: React.FC = () => {
  const { user } = useUser();
  return user ? <AppScreens /> : <LoginScreen />;
};
