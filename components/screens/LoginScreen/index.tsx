/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "components/screens";
import { useUser } from "model/user";
import { Login } from "components/Login";

type LoginProps = {
  navigation: StackNavigationProp<LoginStackParamList, "Login">;
  route: RouteProp<LoginStackParamList, "Login">;
};

export const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { signInUser, authErrorMsg, resetAuthError } = useUser();
  const navigationFunctions = {
    goToSignUp: () => navigation.navigate("SignUp"),
    goToForgotPassword: () => navigation.navigate("ForgotPassword"),
  };
  return (
    <Login
      signInUser={signInUser}
      authErrorMsg={authErrorMsg}
      resetAuthError={resetAuthError}
      {...navigationFunctions}
    />
  );
};
