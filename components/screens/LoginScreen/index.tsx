/** @format */

import React from 'react';
import { useUser } from 'model/user';
import { Login } from 'components/Login';

export const LoginScreen: React.FC = () => {
  const { createUser, loginUser, authErrorMsg, resetAuthError } = useUser();
  return (
    <Login
      createUser={createUser}
      loginUser={loginUser}
      authErrorMsg={authErrorMsg}
      resetAuthError={resetAuthError}
    />
  );
};
