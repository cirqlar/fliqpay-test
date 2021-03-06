import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import ReviewForm from ".";

it("should render without errors", () => {
  const mockData = {
    source_currency: "USD",
    source_amount: 1000,
    transaction_fee: 100,
    amount_to_convert: 900,
    conversion_rate: 1.14989,
    destination_currency: "EUR",
    destination_amount: 1034.91,
    inside_europe: true,
    email: "an@email.com",
    fullname: "John Doe",
    iban_acc: "ALDKNEDLDKEND",
    swift: "SBDOENDDOE",
  };
  const goToNext = jest.fn();
  act(() => {
    render(<ReviewForm data={mockData} goToNext={goToNext} />);
  });

  expect(screen.getByText("John gets")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Continue"));
  expect(goToNext).toHaveBeenCalled();
});
