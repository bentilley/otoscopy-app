/** @format */

import * as Sentry from "@sentry/react-native";

export const setUpSentry = () => {
  if (!__DEV__) {
    Sentry.init({
      dsn:
        "https://c3ce9e802b9e4b8f8c452289ca8c8312@o406224.ingest.sentry.io/5273264",
    });
  }
  return Sentry;
};

export { ErrorHandlingProvider, useErrorHandling } from "./ErrorHandling";
