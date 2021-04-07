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

jest.mock("model/user");
jest.mock("components/UI");
jest.mock("services/firebase");

describe("<SlideView />", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Random Browse"));

    let screen = within(getByTestId("slide-view-screen"));
    expect(screen.getByText("Tap to reveal diagnosis")).toBeTruthy();
  });

  it("reveals the diagnosis", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Random Browse"));

    let screen = within(getByTestId("slide-view-screen"));
    await fireEvent.press(screen.getByText("Tap to reveal diagnosis"));
    expect(screen.queryByText("Otitis Media")).toBeTruthy();
    expect(
      screen.queryByText(
        "Right ear Acute Otitis Media. Bulging tympanic membrane with purulent effusion visible.",
      ),
    ).toBeTruthy();
    await fireEvent.press(getByText("next"));
    await waitFor(() => {
      screen.getByText("Tap to reveal diagnosis");
    });
  });

  it("can navigate to the condition view", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Random Browse"));

    let screen = within(getByTestId("slide-view-screen"));
    await fireEvent.press(screen.getByText("Tap to reveal diagnosis"));
    expect(screen.queryByText("Otitis Media")).toBeTruthy();
    await fireEvent.press(screen.getByText("More info..."));

    screen = within(getByTestId("condition-view-screen"));
    await waitFor(() => {
      expect(screen.queryByText("Otoscopy")).toBeTruthy();
      expect(screen.queryByText("Population")).toBeTruthy();
    });
  });

  it("closes the diagnosis drawer on press", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Random Browse"));

    let screen = within(getByTestId("slide-view-screen"));
    await fireEvent.press(screen.getByText("Tap to reveal diagnosis"));
    expect(screen.queryByText("Otitis Media")).toBeTruthy();
    expect(
      screen.queryByText(
        "Right ear Acute Otitis Media. Bulging tympanic membrane with purulent effusion visible.",
      ),
    ).toBeTruthy();
    await fireEvent.press(getByTestId("slide-view__close_drawer"));
    await waitFor(() => {
      expect(screen.queryByText("More info...")).toBeNull();
    });
  });

  it("can show the legend if the slide has one", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Random Browse"));

    let screen = within(getByTestId("slide-view-screen"));
    await fireEvent.press(screen.getByTestId("slide-view__overlay-btn"));
    expect(screen.getByText("manubrium of malleus")).toBeTruthy();
    await fireEvent.press(getByTestId("slide-view__close_drawer"));
    await waitFor(() => {
      expect(screen.queryByText("manubrium of malleus")).toBeNull();
    });
  });
});
