/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "components/screens";
import { ResetSentSuccess } from "components/ForgotPassword";

type ResetSentSuccessProps = {
  navigation: StackNavigationProp<LoginStackParamList, "ResetSentSuccess">;
  route: RouteProp<LoginStackParamList, "ResetSentSuccess">;
};

export const ResetSentSuccessScreen: React.FC<ResetSentSuccessProps> = ({
  navigation,
}) => {
  const navigationFunctions = {
    goToLogin: () => navigation.navigate("Login"),
  };
  return <ResetSentSuccess {...navigationFunctions} />;
};
