/** @format */

import React from 'react';
import { checkIfInvalidContext } from 'utils';
import { Client } from '@sentry/types';

interface ErrorHandlers {
  logError: (e: Error, extra: { [key: string]: any }) => void;
}

const ErrorHandlingContext = React.createContext<ErrorHandlers | null>(null);

interface Props {
  sentry: Client | any;
}

export const ErrorHandlingProvider: React.FC<Props> = ({
  children,
  sentry,
}) => {
  const errorHandlers = {
    logError: (e: Error, extra: { [key: string]: any }) => {
      sentry.setContext('extra_information', extra);
      sentry.captureException(e);
    },
  };
  return (
    <ErrorHandlingContext.Provider value={errorHandlers}>
      {children}
    </ErrorHandlingContext.Provider>
  );
};

export const useErrorHandling = () => {
  const context = React.useContext(ErrorHandlingContext);
  checkIfInvalidContext(context);
  return context as ErrorHandlers;
};
