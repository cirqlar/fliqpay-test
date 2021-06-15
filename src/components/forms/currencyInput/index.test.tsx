import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";

import CurrencyInput from ".";

it("should render without errors", () => {
  act(() => {
    render(<CurrencyInput labelText="You send" defaultCountryCode="" />);
  })

  expect(screen.getByText('You send')).toBeInTheDocument();
})

it("should select country code properly", () => {
  const selectCountryCode = jest.fn();
  act(() => {
    render(<CurrencyInput labelText="You send" defaultCountryCode="us" onCodeChange={selectCountryCode}  />)
  })

  const currencySelect = screen.getByLabelText(/Select Currency/i) as HTMLSelectElement;
  expect(currencySelect.value).toBe("us");
  const currencyImg = screen.getByAltText(/us flag/i) as HTMLImageElement;
  expect(currencyImg.src).toBe("https://flagcdn.com/h20/us.png");

  fireEvent.change(currencySelect, { target: { value: 'eu' } });

  expect(currencySelect.value).toBe("eu");
  expect(currencyImg.src).toBe("https://flagcdn.com/h20/eu.png");
  expect(selectCountryCode).toHaveBeenCalledWith("eu");
})

it("should select country code properly when onCodeChange isn't set", () => {
  act(() => {
    render(<CurrencyInput labelText="You send" defaultCountryCode="us"  />)
  })

  const currencySelect = screen.getByLabelText(/Select Currency/i) as HTMLSelectElement;
  expect(currencySelect.value).toBe("us");

  fireEvent.change(currencySelect, { target: { value: 'eu' } });

  expect(currencySelect.value).toBe("eu");
})