/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "components/screens";
import { useUser } from "model/user";
import { ForgotPassword } from "components/ForgotPassword";

type ForgotPasswordProps = {
  navigation: StackNavigationProp<LoginStackParamList, "ForgotPassword">;
  route: RouteProp<LoginStackParamList, "ForgotPassword">;
};

export const ForgotPasswordScreen: React.FC<ForgotPasswordProps> = ({
  navigation,
}) => {
  const { sendPasswordReset, authErrorMsg, resetAuthError } = useUser();
  const navigationFunctions = {
    goToLogin: () => navigation.navigate("Login"),
    goToResetSentSuccess: () => navigation.navigate("ResetSentSuccess"),
  };
  return (
    <ForgotPassword
      sendPasswordReset={sendPasswordReset}
      authErrorMsg={authErrorMsg}
      resetAuthError={resetAuthError}
      {...navigationFunctions}
    />
  );
};
