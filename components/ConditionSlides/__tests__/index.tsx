/** @format */

import React from "react";
import { ConditionSlides } from "../index";
import { ConditionProvider } from "model/condition";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { slideData } from "components/ConditionSlides/__mocks__/slide-data";
import { Slide } from "model/condition/types";

jest.mock("model/user");
jest.mock("services/error-handling");
jest.mock("services/firebase");

let navigationStubs: {
  goToSlide: () => void;
  goToCondition: () => void;
  goToStudySlides: () => void;
};

let props: {
  slides: { [slideId: string]: Slide };
} = {
  slides: slideData,
};

beforeEach(() => {
  navigationStubs = {
    goToSlide: jest.fn(),
    goToCondition: jest.fn(),
    goToStudySlides: jest.fn(),
  };

  props.slides = slideData;
});

afterEach(cleanup);

describe("<ConditionSlideList />", () => {
  it("renders correctly", async () => {
    const { queryAllByText, findAllByTestId } = render(
      <ConditionProvider>
        <ConditionSlides {...navigationStubs} {...props} />
      </ConditionProvider>,
    );
    expect(queryAllByText("view slide").length).toEqual(3);
    const imgs = await findAllByTestId(/slide-image-/);
    expect(imgs.length).toEqual(3);
  });

  it("navigates to the correct slide when the slide is pressed", async () => {
    const { getAllByText, findAllByTestId } = render(
      <ConditionProvider>
        <ConditionSlides {...navigationStubs} {...props} />
      </ConditionProvider>,
    );
    await findAllByTestId(/slide-image-/); // wait for async img code to finish
    const btns = getAllByText("view slide");
    expect(btns.length).toEqual(3);
    fireEvent.press(btns[0]);
    expect(navigationStubs.goToSlide).toHaveBeenCalledWith(
      expect.objectContaining({ condition: "Otitis Media" }),
    );
  });
});
