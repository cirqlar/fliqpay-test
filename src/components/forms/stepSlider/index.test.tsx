import React from "react";
import { act, render, screen } from "@testing-library/react";

import StepSlider from ".";


const steps = ["Amount", "Recipient", "Review", "Pay", "Cat", "Me too"];

it("should render without errors", () => {
  act(() => {
    render(<StepSlider steps={steps} current={0} />);
  });
})

steps.forEach((step, index) => {
  it(`should render in the correct position ${index}`, () => {
    act(() => {
      render(<StepSlider steps={steps} current={index} />);
    })
  
    const stepElements = screen.getAllByTestId("stepBars");
    const stepIndicator = screen.getByTestId("stepIndicator");

    expect(stepElements[index].contains(stepIndicator)).toBe(true);
  })
});

it("should render in last position when current is greater than length", () => {
  act(() => {
    render(<StepSlider steps={steps} current={20} />);
  })

  const stepElements = screen.getAllByTestId("stepBars");
  const stepIndicator = screen.getByTestId("stepIndicator");

  expect(stepElements[steps.length - 1].contains(stepIndicator)).toBe(true);
})