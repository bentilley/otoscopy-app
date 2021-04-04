/** @format */

import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "components/screens";
import { ContactUs } from "components/ContactUs";
import { useConditionsActions } from "model/condition";

type ContactUsProps = {
  navigation: StackNavigationProp<RootStackParamList, "Menu">;
  route: RouteProp<RootStackParamList, "Menu">;
};

export const ContactUsScreen: React.FC<ContactUsProps> = ({ navigation }) => {
  const { submitFeedback } = useConditionsActions();
  return (
    <ContactUs
      goToLandingPage={() => navigation.popToTop()}
      submitFeedback={submitFeedback}
    />
  );
};
