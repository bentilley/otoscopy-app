/** @format */

import React from "react";
import { AppScreens } from "components/screens";
import { db } from "services/firebase";
import {
  render,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react-native";

jest.mock("components/UI");
jest.mock("model/user");
jest.mock("services/firebase");

describe("<ConditionView />", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Conditions"));

    let screen = within(getByTestId("reference-screen"));
    await fireEvent.press(screen.getByText("Diseases of the middle ear"));
    await fireEvent.press(screen.getByText("Otitis Media"));

    screen = within(getByTestId("condition-view-screen"));
    await waitFor(() => {
      expect(screen.queryByText("Strep Pneumoniae")).toBeTruthy();
      expect(screen.queryByText("Conductive hearing loss")).toBeTruthy();
      expect(
        screen.queryByText("CT/MRI if intracranial complications suspected"),
      ).toBeTruthy();
    });
  });

  it("renders loading if there is no condition info", async () => {
    const { queryByText, getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Conditions"));

    const refScreen = within(getByTestId("reference-screen"));
    await fireEvent.press(refScreen.getByText("Normal Anatomy"));
    await fireEvent.press(refScreen.getByText("Blank Condition Data"));

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeTruthy();
    });
  });

  it("navigates to slide view when slide button is pressed", async () => {
    const { getByText, getByTestId, queryByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Conditions"));

    let screen = within(getByTestId("reference-screen"));
    await fireEvent.press(screen.getByText("Diseases of the middle ear"));
    await fireEvent.press(screen.getByText("Otitis Media"));

    screen = within(getByTestId("condition-view-screen"));
    await fireEvent.press(screen.getByText("view slides"));

    screen = within(getByTestId("condition-slide-view-screen"));
    await waitFor(() => {
      expect(queryByText("ConditionSlides")).toBeTruthy();
      expect(screen.queryAllByText("view slide")).toBeTruthy();
    });
  });

  it("can have external links in sections (i.e. further reading", async () => {
    const { Linking } = require("react-native");
    Linking.canOpenURL.mockReturnValue(true);

    const { queryByText, getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });

    await fireEvent.press(getByTestId("menu-button"));
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
