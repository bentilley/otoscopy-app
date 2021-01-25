/** @format */

import React from "react";
import App from "../App";

import { render, fireEvent } from "@testing-library/react-native";

jest.mock("services/error-handling");
jest.mock("services/firebase");

describe("<App />", () => {
  it("renders app after sign in", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<App />);

    getByText("OtoApp");
    getByText("Login");

    fireEvent.changeText(
      getByPlaceholderText("email address"),
      "doctor@hospital.uk",
    );
    fireEvent.changeText(getByPlaceholderText("password"), "password123");
    fireEvent.press(getByText("Sign In"));

    await findByText("Otoscopy App");

    getByText("Conditions");
    getByText("Favourites");
    getByText("Random Browse");
    getByText("Sign Out");
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

    getByText("Please check your emails");
    fireEvent.press(getByText("Back to login"));

    await findByText("Login");
  });
});
