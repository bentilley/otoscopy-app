/** @format */

import React from "react";
import { Menu } from "../index";
import { render, fireEvent } from "@testing-library/react-native";

let navigationStubs: {
  goToReference: () => void;
  goToFavourites: () => void;
  goToContactUs: () => void;
  signOutUser: () => void;
};

beforeEach(() => {
  navigationStubs = {
    goToReference: jest.fn(),
    goToFavourites: jest.fn(),
    goToContactUs: jest.fn(),
    signOutUser: jest.fn(),
  };
});

describe("<Menu />", () => {
  it("renders correctly", () => {
    const { queryByText } = render(<Menu {...navigationStubs} />);
    expect(queryByText("Conditions")).toBeTruthy();
    expect(queryByText("Favourites")).toBeTruthy();
    expect(queryByText("Contact Us")).toBeTruthy();
    expect(queryByText("Sign Out")).toBeTruthy();
  });

  it("navigates to the Reference menu", () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText("Conditions");
    fireEvent.press(btn);
    expect(navigationStubs.goToReference).toHaveBeenCalled();
  });

  it("navigates to the Favourites menu", () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText("Favourites");
    fireEvent.press(btn);
    expect(navigationStubs.goToFavourites).toHaveBeenCalled();
  });

  it("signs out the user", () => {
    const { getByText } = render(<Menu {...navigationStubs} />);
    const btn = getByText("Sign Out");
    fireEvent.press(btn);
    expect(navigationStubs.signOutUser).toHaveBeenCalled();
  });
});
