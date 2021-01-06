/** @format */

import React from "react";
import { FavouriteSlides } from "../index";
import { ConditionProvider } from "model/condition";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { slideData } from "components/ConditionSlides/__mocks__/slide-data";
import { Slide } from "model/condition/types";

jest.mock("model/user");
jest.mock("services/error-handling");
jest.mock("services/firebase");

let navigationStubs: {
  goToSlide: () => void;
  studyFavourites: () => void;
};

let props: {
  slides: { [slideId: string]: Slide };
} = {
  slides: slideData,
};

beforeEach(() => {
  navigationStubs = {
    goToSlide: jest.fn(),
    studyFavourites: jest.fn(),
  };

  props.slides = slideData;
});

afterEach(cleanup);

describe("<FavouritesSlideList />", () => {
  it("renders correctly", async () => {
    const { findAllByTestId } = render(
      <ConditionProvider>
        <FavouriteSlides {...navigationStubs} {...props} />
      </ConditionProvider>,
    );
    const imgs = await findAllByTestId(/slide-image-/);
    expect(imgs.length).toEqual(3);
  });

  it("navigates to the correct slide when the slide is pressed", async () => {
    const { findAllByTestId, getAllByText } = render(
      <ConditionProvider>
        <FavouriteSlides {...navigationStubs} {...props} />
      </ConditionProvider>,
    );
    await findAllByTestId(/slide-image-/);
    const btns = getAllByText("view slide");
    expect(btns.length).toEqual(3);
    fireEvent.press(btns[0]);
    expect(navigationStubs.goToSlide).toHaveBeenCalledWith(
      expect.objectContaining({ condition: "Otitis Media" }),
    );
  });
});
