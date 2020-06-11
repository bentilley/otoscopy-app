/** @format */

import React from 'react';
import { UserProvider } from 'model/user';
import { LoginWrappedApp } from 'components';
import { setUpSentry, ErrorHandlingProvider } from 'services/error-handling';

const sentry = setUpSentry();

const App = () => {
  return (
    <ErrorHandlingProvider sentry={sentry}>
      <UserProvider>
        <LoginWrappedApp />
      </UserProvider>
    </ErrorHandlingProvider>
  );
};

export default App;
