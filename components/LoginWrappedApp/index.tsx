/** @format */

import React from 'react';
import { AppScreens } from 'components/screens';
import { LoginScreens } from 'components/screens';
import { useUser } from 'model/user';

/**TODO Add loading spinner to login and sign up screen.

# Description

This should show on the transition to the app, once the user has signed in.

@label UI
*/

export const LoginWrappedApp: React.FC = () => {
  const { user } = useUser();
  return user ? <AppScreens /> : <LoginScreens />;
};
