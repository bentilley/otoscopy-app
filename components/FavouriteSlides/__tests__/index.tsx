/** @format */

import React from "react";
import { AppScreens } from "components/screens";
import { db } from "services/firebase";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("model/user");
jest.mock("components/UI");
jest.mock("services/firebase");

describe("<FavouritesSlideList />", () => {
  it("renders correctly", async () => {
    const { getByText, queryAllByText, getByTestId } = render(<AppScreens />);
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Favourites"));
    await waitFor(async () => {
      // Use "view slide" buttons to count the number of slides.
      const viewBtns = queryAllByText("view slide");
      expect(viewBtns.length).toEqual(2);
    });
  });

  it("navigates to the correct slide when the slide is pressed", async () => {
    const { getByText, getAllByText, queryAllByText, getByTestId } = render(
      <AppScreens />,
    );
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Favourites"));
    const btns = getAllByText("view slide");
    expect(btns.length).toEqual(2);
    await fireEvent.press(btns[0]);
    await waitFor(() => {
      expect(queryAllByText("Tap to reveal diagnosis").length).toEqual(2);
    });
  });

  it("requires confirmation to remove a favourite", async () => {
    const { getByText, getAllByText, queryAllByText, getByTestId } = render(
      <AppScreens />,
    );
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Favourites"));
    const removeBtns = queryAllByText("remove");
    expect(removeBtns.length).toEqual(2);
    const btns = getAllByText("remove");
    await fireEvent.press(btns[0]);
    await fireEvent.press(getByText("sure?"));
    await waitFor(async () => {
      expect(queryAllByText("remove").length).toEqual(1);
    });
  });

  it("can cancel remove press", async () => {
    const { getByText, getAllByText, queryAllByText, getByTestId } = render(
      <AppScreens />,
    );
    await waitFor(() => {
      expect(db.watchUserFavourites).toHaveBeenCalled();
    });
    await fireEvent.press(getByTestId("menu-button"));
    await fireEvent.press(getByText("Favourites"));
    const viewBtns = queryAllByText("remove");
    expect(viewBtns.length).toEqual(2);
    const btns = getAllByText("remove");
    await fireEvent.press(btns[0]);
    await fireEvent.press(getByText("cancel"));
    await waitFor(async () => {
      expect(queryAllByText("remove").length).toEqual(2);
    });
  });
});
