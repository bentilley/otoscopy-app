/** @format */

import React from "react";
import { AppScreens } from "components/screens";
import { db } from "services/firebase";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("model/user");
jest.mock("components/UI");
jest.mock("services/firebase");

describe("<SlideView />", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByText("Random Browse"));
    expect(getByText("Tap to reveal diagnosis")).toBeTruthy();
  });

  it("reveals the diagnosis", async () => {
    const { getByText, queryByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByText("Random Browse"));
    fireEvent.press(getByText("Tap to reveal diagnosis"));
    expect(queryByText("Otitis Media")).toBeTruthy();
    expect(
      queryByText(
        "Right ear Acute Otitis Media. Bulging tympanic membrane with purulent effusion visible.",
      ),
    ).toBeTruthy();
    fireEvent.press(getByText("next"));
    // Not really part of the test just letting React finish up
    await waitFor(() => {
      getByText("Tap to reveal diagnosis");
    });
  });

  it("can navigate to the condition view", async () => {
    const { getByText, queryByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByText("Random Browse"));
    fireEvent.press(getByText("Tap to reveal diagnosis"));
    fireEvent.press(getByText("More info..."));
    expect(queryByText("Condition")).toBeTruthy();
    expect(queryByText("Otitis Media")).toBeTruthy();
    // Not really part of the test just letting React finish up
    await waitFor(() => {
      getByText("Condition");
    });
  });

  it("closes the diagnosis drawer on press", async () => {
    const { getByText, queryByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByText("Random Browse"));
    fireEvent.press(getByText("Tap to reveal diagnosis"));
    expect(queryByText("Otitis Media")).toBeTruthy();
    expect(
      queryByText(
        "Right ear Acute Otitis Media. Bulging tympanic membrane with purulent effusion visible.",
      ),
    ).toBeTruthy();
    fireEvent.press(getByTestId("slide-view__close_drawer"));
    // Not really part of the test just letting React finish up
    await waitFor(() => {
      getByText("Tap to reveal diagnosis");
    });
  });
});
