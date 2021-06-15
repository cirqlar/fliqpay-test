import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import MultiStepForm, { StepType } from ".";

const steps: StepType[] = [
  ['Component One', ({ goToNext }) => (
    <div>
      <span>Component One Text</span>
      <button onClick={() => goToNext("Component One Data")}>Component One Button</button>
    </div>
  )],
  ['Component Two', ({ data, goToNext }) => (
    <div>
      <span>Component Two Text</span>
      <span data-testid="dataTwo">{ data }</span>
      <button onClick={() => goToNext("Component Two Data")}>Component Two Button</button>
    </div>
  )],
  ['Component Three', ({ data, goToNext }) => (
    <div>
      <span>Component Three Text</span>
      <span data-testid="dataThree">{ data }</span>
      <button onClick={() => goToNext("Component Three Data")}>Component Three Button</button>
    </div>
  )],
]

it("should render steps correctly", () => {
  const executeAfter = jest.fn();
  act(() => {
    render(<MultiStepForm steps={steps} executeAfter={executeAfter} />);
  });

  expect(screen.getByText("Component One Text")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Component One Button"));

  expect(screen.getByText("Component Two Text")).toBeInTheDocument();
  expect(screen.getByTestId("dataTwo").textContent).toBe("Component One Data");
  fireEvent.click(screen.getByText("Component Two Button"));

  expect(screen.getByText("Component Three Text")).toBeInTheDocument();
  expect(screen.getByTestId("dataThree").textContent).toBe("Component Two Data");
  fireEvent.click(screen.getByText("Component Three Button"));

  expect(executeAfter).toHaveBeenCalledWith("Component Three Data");
})

it("should render steps correctly with executeBetween", () => {
  const executeBetween = jest.fn((currentStep, data) => data + currentStep);
  const executeAfter = jest.fn();
  act(() => {
    render(<MultiStepForm steps={steps} executeBetween={executeBetween} executeAfter={executeAfter} />);
  });

  expect(screen.getByText("Component One Text")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Component One Button"));

  expect(executeBetween).lastCalledWith(0, "Component One Data");
  expect(screen.getByText("Component Two Text")).toBeInTheDocument();
  expect(screen.getByTestId("dataTwo").textContent).toBe("Component One Data0");
  fireEvent.click(screen.getByText("Component Two Button"));

  expect(executeBetween).lastCalledWith(1, "Component Two Data");
  expect(screen.getByText("Component Three Text")).toBeInTheDocument();
  expect(screen.getByTestId("dataThree").textContent).toBe("Component Two Data1");
  fireEvent.click(screen.getByText("Component Three Button"));

  expect(executeAfter).toHaveBeenCalledWith("Component Three Data");
})