import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import AmountForm from ".";

it("should render without errors", () => {
  act(() => {
    render(<AmountForm goToNext={() => {}} />);
  })
});

it("should validate send input properly", () => {
  act(() => {
    render(<AmountForm goToNext={() => {}} />);
  })

  const send = screen.getByLabelText('You send') as HTMLInputElement;
  fireEvent.change(send, { target: { value: '1000' } });
  expect(send.value).toBe('1,000');

  fireEvent.change(send, { target: { value: '1,000.90' } })
  expect(send.value).toBe('1,000.90');

  fireEvent.change(send, { target: { value: '1,000.902' } })
  expect(send.value).toBe('1,000.90');

  fireEvent.change(send, { target: { value: 'ABCD-' } })
  expect(send.value).toBe('1,000.90');

  fireEvent.change(send, { target: { value: '01,000.90.0' } })
  expect(send.value).toBe('1,000.90');

  fireEvent.change(send, { target: { value: '' } })
  expect(send.value).toBe('');
})

it("should display conversion info correctly", () => {
  act(() => {
    render(<AmountForm goToNext={() => {}} />);
  })

  expect(screen.queryByText("Transfer fee")).not.toBeInTheDocument();
  const compare = screen.getByText("Compare Rates");
  expect(compare).toHaveAttribute('disabled');

  const send = screen.getByLabelText('You send');
  fireEvent.change(send, { target: { value: '1000' } });

  expect(compare).not.toHaveAttribute('disabled');
  fireEvent.click(compare);

  expect(screen.queryByText("Transfer fee")).toBeInTheDocument();
})

it("should submit properly", () => {
  const goToNext = jest.fn();

  act(() => {
    render(<AmountForm goToNext={goToNext} />);
  })

  const submit = screen.getByText('Continue');
  expect(submit).toHaveAttribute('disabled');

  const send = screen.getByLabelText('You send');
  fireEvent.change(send, { target: { value: '1000' } });

  expect(submit).not.toHaveAttribute('disabled');
  fireEvent.click(submit);

  expect(goToNext).toHaveBeenCalled();
  expect(goToNext.mock.calls[0][0].source_amount).toBe(1000);
})