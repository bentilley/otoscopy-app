/** @format */

import React from "react";
import { Linking } from "react-native";

export const useLinkHandler = (url: string) => {
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  return React.useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  }, [url]);
};
