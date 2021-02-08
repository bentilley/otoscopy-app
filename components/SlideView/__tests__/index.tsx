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
    const { getByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });
    fireEvent.press(getByText("Random Browse"));
    expect(getByText("Tap to reveal diagnosis")).toBeTruthy();
  });

  it("reveals the diagnosis", async () => {
    const { getByText, queryByText } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.getCondition).toHaveBeenCalled();
    });
    fireEvent.press(getByText("Random Browse"));
    fireEvent.press(getByText("Tap to reveal diagnosis"));
    expect(queryByText("Otitis Media")).toBeTruthy();
    expect(
      queryByText(
        "Right ear Acute Otitis Media. Bulging tympanic membrane with purulent effusion visible.",
      ),
    ).toBeTruthy();
    fireEvent.press(getByText("next"));
    await waitFor(() => {
      getByText("Tap to reveal diagnosis");
    });
  });

  it.skip("closes the diagnosis drawer on swipe", () => {
    /* const { getByText, queryByText } = render( */
    /*   <SlideViewProvider totalNumberOfSlides={0} startingIndex={0}> */
    /*     <SlideView {...navigationStubs} {...props} />, */
    /*   </SlideViewProvider>, */
    /* ); */
    /* const btn = getByText('Tap to reveal diagnosis'); */
    /* fireEvent.press(btn); */
  });
});
