import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import AmountForm from ".";

it("should validate send input properly", async () => {
  act(() => {
    render(<AmountForm goToNext={() => {}} />);
  });

  // wait until component has finished loading
  await waitFor(() => {
    expect(screen.getAllByLabelText(/Select Currency/i)[0]).not.toHaveAttribute("disabled")
  });

  const send = screen.getByLabelText("You send") as HTMLInputElement;
  fireEvent.change(send, { target: { value: "1000" } });
  expect(send.value).toBe("1,000");

  fireEvent.change(send, { target: { value: "1,000.90" } });
  expect(send.value).toBe("1,000.90");

  fireEvent.change(send, { target: { value: "1,000.902" } });
  expect(send.value).toBe("1,000.90");

  fireEvent.change(send, { target: { value: "ABCD-" } });
  expect(send.value).toBe("1,000.90");

  fireEvent.change(send, { target: { value: "01,000.90.0" } });
  expect(send.value).toBe("1,000.90");

  fireEvent.change(send, { target: { value: "" } });
  expect(send.value).toBe("");
});

it("should display conversion info correctly", async () => {
  act(() => {
    render(<AmountForm goToNext={() => {}} />);
  });

  // wait until component has finished loading
  const selectCurrency = screen.getAllByLabelText(/Select Currency/i)[0];
  await waitFor(() => {
    expect(selectCurrency).not.toHaveAttribute("disabled")
  });

  expect(screen.queryByText("Transfer fee")).not.toBeInTheDocument();

  const send = screen.getByLabelText("You send");
  fireEvent.change(send, { target: { value: "1000" } });

  fireEvent.change(selectCurrency, { target: { value: "EUR" }});
  await waitFor(() => {
    expect(selectCurrency).not.toHaveAttribute("disabled")
  });

  expect(screen.queryByText("Transfer fee")).toBeInTheDocument();
});

it("should submit properly", async () => {
  const goToNext = jest.fn();
  act(() => {
    render(<AmountForm goToNext={goToNext} />);
  });

  // wait until component has finished loading
  await waitFor(() => {
    expect(screen.getAllByLabelText(/Select Currency/i)[0]).not.toHaveAttribute("disabled")
  });

  const submit = screen.getByText("Continue");
  expect(submit).toHaveAttribute("disabled");

  const send = screen.getByLabelText("You send");
  fireEvent.change(send, { target: { value: "1000" } });

  expect(submit).not.toHaveAttribute("disabled");
  fireEvent.click(submit);

  expect(goToNext).toHaveBeenCalled();
  expect(goToNext.mock.calls[0][0].source_amount).toBe(1000);
});
