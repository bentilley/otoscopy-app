/** @format */

import React from "react";
import App from "../App";
import { sendPasswordReset } from "services/firebase";

import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("services/error-handling");
jest.mock("services/firebase");

describe("<App />", () => {
  it("renders app after sign in", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

    getByText("Login");

    await fireEvent.changeText(
      getByPlaceholderText("email address"),
      "doctor@hospital.uk",
    );
    await fireEvent.changeText(getByPlaceholderText("password"), "password123");
    await fireEvent.press(getByText("Sign In"));

    await fireEvent.press(getByTestId("menu-button"));

    await waitFor(() => {
      getByText("Conditions");
      getByText("Favourites");
      getByText("Sign Out");
    });
  });

  it("can send a password reset if needed", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<App />);

    getByText("Login");
    fireEvent.press(getByText("forgot password?"));

    getByText("Forgot Password");

    fireEvent.changeText(
      getByPlaceholderText("the email address you signed up with"),
      "doctor@hospital.uk",
    );
    fireEvent.press(getByText("Send Password Reset"));
    await waitFor(() => {
      expect(sendPasswordReset).toHaveBeenCalled();
    });

    getByText("Please check your emails");
    fireEvent.press(getByText("Back to login"));

    await findByText("Login");
  });
});
