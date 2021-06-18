import React, { useCallback, useState } from "react";

import { useApi } from "../../../../../lib/api";

type CurrencyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelText: string;
  defaultCurrency?: string;
  onCurrencyChange?: (currency: string) => any;
};

function CurrencyInput({ labelText, defaultCurrency, onCurrencyChange, id, ...inputProps }: CurrencyInputProps) {
  const [currency, setCurrency] = useState(defaultCurrency ?? "USD");
  const { data, isLoading, isError } = useApi("/symbols", undefined, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [options, setOptions] = useState<string[]>([]);

  React.useEffect(() => {
    if (!isLoading && !isError) {
      const options = Object.keys(data.symbols);
      setOptions(options);
    }
  }, [isLoading, data, isError]);

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      setCurrency(e.target.value);
      if (onCurrencyChange) onCurrencyChange(e.target.value);
    },
    [onCurrencyChange]
  );

  return (
    <div className="h-16 border border-gray-base rounded flex relative mt-5 first:mt-0">
      <label htmlFor={id} className=" text-xs text-gray-base absolute top-2 left-4">
        {labelText}
      </label>
      <input
        type="text"
        id={id}
        {...inputProps}
        className="h-full w-[72%] pt-7 pb-2 px-4 text-lg text-primary-accent"
      />
      <div className="h-full w-[28%] px-3 bg-gray-light flex items-center">
        <img
          src={currency ? `https://wise.com/public-resources/assets/flags/rectangle/${currency.toLowerCase()}.png` : ""}
          alt={currency ? `${currency} flag` : "Select Country"}
          className="w-[18px] h-[18px] rounded-full object-cover sm:w-5 sm:h-5"
          onError={(e) =>
            (e.currentTarget.src = "https://wise.com/public-resources/assets/flags/rectangle_fallback.png")
          }
        />
        <select
          className="ml-1 sm:ml-3 bg-transparent text-xs font-medium flex-auto sm:text-sm"
          aria-label="Select Currency"
          onChange={handleSelectChange}
          value={currency}
          disabled={isLoading || isError}
        >
          {options.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyInput;
