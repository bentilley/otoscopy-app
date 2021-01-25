/** @format */

import React from "react";
import ConditionView from "../index";
import { Condition } from "model/condition/types";
import { render, fireEvent, cleanup } from "@testing-library/react-native";

let navigationStubs: {
  goToSlides: () => void;
};

let condition: Condition;

beforeEach(() => {
  navigationStubs = {
    goToSlides: jest.fn(),
  };

  condition = {
    id: "otitis",
    name: "Otitis Media",
    description: "Acute onset inflamation of the middle ear space",
    population: ["Commonly paediatric 3-7 years"],
    aetiology: {
      bacterial: {
        information: [
          "Strep Pneumoniae",
          "Haemophilus",
          "Moraxella Catarrhalis",
        ],
        title: "Bacterial",
      },
      viral: {
        information: ["Rhinovirus", "RSV", "Adenovirus"],
        title: "Viral (75% cases)",
      },
    },
    audiology: {},
    clinical_signs: {},
    complications: {},
    investigations: {},
    management: {},
    otoscopy: {},
    risk_factors: {},
    symptoms: {},
  };
});

afterEach(cleanup);

describe("<ConditionView />", () => {
  it("renders correctly", () => {
    const { queryByText } = render(
      <ConditionView {...navigationStubs} condition={condition} />,
    );
    expect(
      queryByText("Acute onset inflamation of the middle ear space"),
    ).toBeTruthy();
  });

  it("renders loading if there is no condition info", () => {
    const { queryByText } = render(
      <ConditionView {...navigationStubs} condition={null} />,
    );
    expect(queryByText("Loading...")).toBeTruthy();
  });

  it("navigates to the slide view when the slide button is pressed", () => {
    const { getByText } = render(
      <ConditionView {...navigationStubs} condition={condition} />,
    );
    const btn = getByText("view slides");
    fireEvent.press(btn);
    expect(navigationStubs.goToSlides).toHaveBeenCalled();
  });
});
