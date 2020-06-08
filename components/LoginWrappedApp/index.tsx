/** @format */

import React from 'react';
import { AppScreens } from 'components/screens';
import { LoginScreens } from 'components/screens';
import { useUser } from 'model/user';

export const LoginWrappedApp: React.FC = () => {
  const { user } = useUser();
  return user ? <AppScreens /> : <LoginScreens />;
};
