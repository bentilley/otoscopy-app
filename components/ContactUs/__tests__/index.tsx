/** @format */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { AppScreens } from "components/screens";
import { db } from "services/firebase";

jest.mock("services/error-handling");
jest.mock("services/firebase");
jest.mock("model/user");

describe("<ContactUs />", () => {
  it("it can record user feedback", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <AppScreens />,
    );
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    getByText("Otoscopy App");

    fireEvent.press(getByText("Contact Us"));

    fireEvent.changeText(
      getByPlaceholderText("Type your message here!"),
      "Hey guys,\n\nGreat App!\n\nLove,\nYour Biggest Fan",
    );
    fireEvent.press(getByText("Send"));

    await waitFor(() => {
      expect(db.submitFeedback).toHaveBeenCalled();
    });
    getByText("Thank you for your feedback!");
    fireEvent.press(getByText("Back to Menu"));
    await waitFor(() => {
      expect(
        queryByText(
          "Use the space below for any questions or comments, " +
            "or just drop us a note to say hello!",
        ),
      ).toBeNull();
    });
  });
});
