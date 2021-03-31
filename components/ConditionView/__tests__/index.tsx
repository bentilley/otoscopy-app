/** @format */

import React from "react";
import { AppScreens } from "components/screens";
import { db } from "services/firebase";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("components/UI");
jest.mock("model/user");
jest.mock("services/firebase");

describe("<ConditionView />", () => {
  it("renders correctly", async () => {
    const { queryByText, getByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByText("Conditions"));
    await fireEvent.press(getByText("Diseases of the middle ear"));
    await fireEvent.press(getByText("Otitis Media"));

    await waitFor(() => {
      expect(queryByText("Strep Pneumoniae")).toBeTruthy();
      expect(queryByText("Conductive hearing loss")).toBeTruthy();
      expect(
        queryByText("CT/MRI if intracranial complications suspected"),
      ).toBeTruthy();
    });
  });

  it("renders loading if there is no condition info", async () => {
    const { queryByText, getByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByText("Conditions"));
    await fireEvent.press(getByText("Normal Anatomy"));
    await fireEvent.press(getByText("Blank Condition Data"));

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeTruthy();
    });
  });

  it("navigates to slide view when slide button is pressed", async () => {
    const { queryByText, queryAllByText, getByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByText("Conditions"));
    await fireEvent.press(getByText("Diseases of the middle ear"));
    await fireEvent.press(getByText("Otitis Media"));
    await fireEvent.press(getByText("view slides"));

    await waitFor(() => {
      expect(queryByText("ConditionSlides")).toBeTruthy();
      expect(queryAllByText("view slide")).toBeTruthy();
    });
  });

  it("can have external links in sections (i.e. further reading", async () => {
    const { Linking } = require("react-native");
    Linking.canOpenURL.mockReturnValue(true);

    const { queryByText, getByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    fireEvent.press(getByText("Conditions"));
    fireEvent.press(getByText("Diseases of the middle ear"));
    fireEvent.press(getByText("Condition with Links"));

    expect(queryByText("Additional Resources")).toBeTruthy();
    fireEvent.press(getByText("Link to something"));
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(
        "https://www.example.com/link-to-something",
      );
    });
  });
});
