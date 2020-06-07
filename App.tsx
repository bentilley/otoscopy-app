/** @format */

import React from 'react';
import { UserProvider } from 'model/user';
import { LoginWrappedApp } from 'components';

const App = () => {
  return (
    <UserProvider>
      <LoginWrappedApp />
    </UserProvider>
  );
};

export default App;
