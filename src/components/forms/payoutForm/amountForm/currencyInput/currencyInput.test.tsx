import React from "react";
import { render, act, screen, fireEvent, waitFor } from "@testing-library/react";

import CurrencyInput from ".";

it("should render without errors", async () => {
  act(() => {
    render(<CurrencyInput labelText="You send" defaultCurrency="" />);
  })

  expect(screen.getByText('You send')).toBeInTheDocument();

  const currencySelect = screen.getByLabelText(/Select Currency/i) as HTMLSelectElement;
  await waitFor(() => expect(currencySelect.value).toBe(""));
})

it("should select country code properly", async () => {
  const selectCurrency = jest.fn();
  act(() => {
    render(<CurrencyInput labelText="You send"  onCurrencyChange={selectCurrency}  />)
  })

  const currencySelect = screen.getByLabelText(/Select Currency/i) as HTMLSelectElement;
  await waitFor(() => expect(currencySelect.value).toBe("USD"));
  const currencyImg = screen.getByAltText(/usd flag/i) as HTMLImageElement;
  expect(currencyImg.src).toBe("https://wise.com/public-resources/assets/flags/rectangle/usd.png");

  fireEvent.change(currencySelect, { target: { value: 'EUR' } });

  expect(currencySelect.value).toBe("EUR");
  expect(currencyImg.src).toBe("https://wise.com/public-resources/assets/flags/rectangle/eur.png");
  expect(selectCurrency).toHaveBeenCalledWith("EUR");
})

it("should select country code properly when onCodeChange isn't set", () => {
  act(() => {
    render(<CurrencyInput labelText="You send" defaultCurrency="USD"  />)
  })

  const currencySelect = screen.getByLabelText(/Select Currency/i) as HTMLSelectElement;
  expect(currencySelect.value).toBe("USD");

  fireEvent.change(currencySelect, { target: { value: 'EUR' } });

  expect(currencySelect.value).toBe("EUR");
})