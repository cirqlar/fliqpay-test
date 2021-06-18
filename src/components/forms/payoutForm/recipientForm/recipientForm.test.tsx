import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import RecipientForm from ".";

it("should render without errors", () => {
  act(() => {
    render(<RecipientForm goToNext={() => {}} />);
  });
});

it("should validate inputs properly and submit", async () => {
  const goToNext = jest.fn();
  act(() => {
    render(<RecipientForm goToNext={goToNext} />);
  });

  const submit = screen.getByText('Continue');
  fireEvent.click(submit);

  await waitFor(() => expect(screen.queryByTestId('fullname')).toBeInTheDocument());
  expect(screen.queryByTestId('iban_acc')).toBeInTheDocument();
  expect(screen.queryByTestId('swift')).not.toBeInTheDocument();
  expect(goToNext).not.toHaveBeenCalled();

  const fullname = screen.getByLabelText(/Full name/);
  fireEvent.change(fullname, { target: { value: 'Jane Doe' }});
  await waitFor(() => expect(screen.queryByTestId('fullname')).not.toBeInTheDocument());

  const iban_acc = screen.getByLabelText(/IBAN/);
  fireEvent.change(iban_acc, { target: { value: 'ABABABABA' }});
  await waitFor(() => expect(screen.queryByTestId('iban_acc')).not.toBeInTheDocument());

  fireEvent.click(submit);
  await waitFor(() => expect(goToNext).toHaveBeenCalledTimes(1));

  const outside_europe = screen.getByLabelText("Outside Europe");
  fireEvent.click(outside_europe);

  await waitFor(() => expect(screen.queryByLabelText(/Swift/i)).toBeInTheDocument());
  fireEvent.click(submit);
  await waitFor(() => expect(screen.queryByTestId('swift')).toBeInTheDocument());
  expect(goToNext).toHaveBeenCalledTimes(1);

  const swift = screen.getByLabelText(/Swift/i);
  fireEvent.change(swift, { target: { value: 'BDBDBDBDBD' } });

  await waitFor(() => expect(screen.queryByTestId('swift')).not.toBeInTheDocument());
  fireEvent.click(submit);
  await waitFor(() => expect(goToNext).toHaveBeenCalledTimes(2));
})