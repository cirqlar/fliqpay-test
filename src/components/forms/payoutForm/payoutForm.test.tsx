import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import PayoutForm from ".";

it("should render without errors", () => {
  act(() => {
    render(<PayoutForm />);
  });
});

it("should pass, store data properly", async () => {
  act(() => {
    render(<PayoutForm />);
  });


  const send = screen.getByLabelText('You send');
  fireEvent.change(send, { target: { value: '1000' } });
  const amountSubmit = screen.getByText('Continue');
  fireEvent.click(amountSubmit);

  const fullname = screen.getByLabelText(/Full name/);
  fireEvent.change(fullname, { target: { value: 'Jane Doe' }});
  const iban_acc = screen.getByLabelText(/IBAN/);
  fireEvent.change(iban_acc, { target: { value: 'ABABABABA' }});
  const recipientSubmit = screen.getByText('Continue');
  fireEvent.click(recipientSubmit);

  await waitFor(() => expect(screen.queryByText("1,000 USD")).toBeInTheDocument());
  expect(screen.getByText("Jane gets")).toBeInTheDocument();
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  expect(screen.getByText("ABABABABA")).toBeInTheDocument();

  const reviewSubmit = screen.getByText('Continue');
  fireEvent.click(reviewSubmit);
})