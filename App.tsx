/** @format */

import React from 'react';
import * as Sentry from '@sentry/react-native';
import { UserProvider } from 'model/user';
import { LoginWrappedApp } from 'components';

Sentry.init({
  dsn:
    'https://c3ce9e802b9e4b8f8c452289ca8c8312@o406224.ingest.sentry.io/5273264',
});

const App = () => {
  return (
    <UserProvider>
      <LoginWrappedApp />
    </UserProvider>
  );
};

export default App;
