/** @format */

import React from "react";
import Reference from "../index";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { Category, ConditionHead } from "model/condition/types";

let categories: Category[];

let navigationStubs: {
  goToCondition: (condition: ConditionHead) => void;
  goToFavourites: () => void;
};

beforeEach(() => {
  navigationStubs = {
    goToCondition: jest.fn(),
    goToFavourites: jest.fn(),
  };

  categories = [
    {
      name: "Diseases of the middle ear",
      conditions: [
        { name: "Otitis Media", id: "AA" },
        { name: "Hurty Drum", id: "AB" },
      ],
    },
    {
      name: "Benitis of the ears",
      conditions: [{ name: "Banging Ben Bones", id: "BA" }],
    },
    {
      name: "Olly Earholes",
      conditions: [{ name: "Octagon ear Ollifilus", id: "CA" }],
    },
  ];
});

afterEach(cleanup);

describe("<Reference />", () => {
  it("renders correctly", () => {
    const { queryByText } = render(
      <Reference categories={categories} {...navigationStubs} />,
    );
    expect(queryByText("Diseases of the middle ear")).toBeTruthy();
    expect(queryByText("Benitis of the ears")).toBeTruthy();
    expect(queryByText("Olly Earholes")).toBeTruthy();
  });

  it("responds to category touch", async () => {
    const { getByText, queryByText } = render(
      <Reference categories={categories} {...navigationStubs} />,
    );
    const category = getByText("Diseases of the middle ear");
    fireEvent.press(category);
    expect(queryByText("Otitis Media")).toBeTruthy();
    expect(queryByText("Hurty Drum")).toBeTruthy();
  });

  it("responds to multiple category touches", () => {
    const { getByText, queryByText } = render(
      <Reference categories={categories} {...navigationStubs} />,
    );
    const category = getByText("Benitis of the ears");
    fireEvent.press(category);
    expect(queryByText("Banging Ben Bones")).toBeTruthy();
    const category2 = getByText("Olly Earholes");
    fireEvent.press(category2);
    expect(queryByText("Octagon ear Ollifilus")).toBeTruthy();
  });

  it("responds to condition touch with relevant navigation", () => {
    const { getByText } = render(
      <Reference categories={categories} {...navigationStubs} />,
    );
    const category = getByText("Benitis of the ears");
    fireEvent.press(category);
    const condition = getByText("Banging Ben Bones");
    fireEvent.press(condition);
    expect(navigationStubs.goToCondition).toHaveBeenCalledWith({
      id: "BA",
      name: "Banging Ben Bones",
    });
  });

  it("handles a category with no conditions", () => {
    // This indicates a bug, but the frontend should handle it
    categories.push({ name: "Normal Anatomy", conditions: null });
    const { getByText } = render(
      <Reference categories={categories} {...navigationStubs} />,
    );
    const category = getByText("Normal Anatomy");
    expect(() => fireEvent.press(category)).not.toThrow(
      /Cannot read property 'map' of undefined/,
    );
  });

  it("can search for a condition", () => {
    // This is for using the search feature at the bottom of the screen
  });
});
