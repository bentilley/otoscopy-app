/** @format */

import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from 'components/screens';
import { useUser } from 'model/user';
import { SignUp } from 'components/SignUp';

type SignUpProps = {
  navigation: StackNavigationProp<LoginStackParamList, 'SignUp'>;
  route: RouteProp<LoginStackParamList, 'SignUp'>;
};

export const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
  const { createUser, authErrorMsg, resetAuthError } = useUser();
  const navigationFunctions = {
    goToLogin: () => navigation.navigate('Login'),
  };
  return (
    <SignUp
      createUser={createUser}
      authErrorMsg={authErrorMsg}
      resetAuthError={resetAuthError}
      {...navigationFunctions}
    />
  );
};
