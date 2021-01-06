/** @format */

import React from "react";
import { SlideView, SlideViewProvider } from "../index";
import { ConditionProvider } from "model/condition";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { slideData } from "components/ConditionSlides/__mocks__/slide-data";
import { Slide } from "model/condition/types";

jest.mock("model/user");
jest.mock("components/UI");

let navigationStubs: {
  goToCondition: () => void;
};

let props: { slidePool: Slide[] } = { slidePool: Object.values(slideData) };

beforeEach(() => {
  navigationStubs = {
    goToCondition: jest.fn(),
  };

  props.slidePool = Object.values(slideData);
});

afterEach(cleanup);

describe("<SlideView />", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ConditionProvider>
        <SlideViewProvider totalNumberOfSlides={0} startingIndex={0}>
          <SlideView {...navigationStubs} {...props} />,
        </SlideViewProvider>
      </ConditionProvider>,
    );
    expect(getByText("Tap to reveal diagnosis")).toBeTruthy();
  });

  it("reveals the diagnosis", () => {
    const { getByText, queryByText } = render(
      <ConditionProvider>
        <SlideViewProvider totalNumberOfSlides={0} startingIndex={0}>
          <SlideView {...navigationStubs} {...props} />,
        </SlideViewProvider>
      </ConditionProvider>,
    );
    const btn = getByText("Tap to reveal diagnosis");
    fireEvent.press(btn);
    expect(queryByText("Otitis Media")).toBeTruthy();
    expect(
      queryByText(
        "Right ear Acute Otitis Media. Bulging tympanic membrane with purulent effusion visible.",
      ),
    ).toBeTruthy();
  });

  it("closes the diagnosis drawer on swipe", () => {
    /* const { getByText, queryByText } = render( */
    /*   <SlideViewProvider totalNumberOfSlides={0} startingIndex={0}> */
    /*     <SlideView {...navigationStubs} {...props} />, */
    /*   </SlideViewProvider>, */
    /* ); */
    /* const btn = getByText('Tap to reveal diagnosis'); */
    /* fireEvent.press(btn); */
  });
});
