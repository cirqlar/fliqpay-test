import React, { useCallback, useEffect, useState } from "react";

import "./amountForm.css";

import FormWrapper from "../formWrapper";
import CurrencyInput from "./currencyInput";
import ConversionInfo from "./conversionInfo";
import Button from "../../shared/button";

import { amountToText, textToAmount, validateText } from "../../../../lib/formatCurrency";
import { useApi } from "../../../../lib/api";

function AmountForm({ goToNext }: { goToNext: (data?: any) => any }) {
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");

  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  
  const [fee, setFee] = useState("");
  const [convert, setConvert] = useState("");
  const [currentRate, setCurrentRate] = useState(0);

  const { data, isLoading, isError } = useApi(
    ["/latest?symbols=", sendCurrency, receiveCurrency], 
    undefined,
    { refreshInterval: 60 * 60 * 1000 } // an hour
  );
  
  React.useEffect(() => {
    if (!isLoading && !isError) {
      const rate = data.rates[sendCurrency] / data.rates[receiveCurrency];
      setCurrentRate(rate);
    }
  }, [data, isError, isLoading, receiveCurrency, sendCurrency]);


  const handleSendAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newAmount = validateText(e.target.value, sendAmount);
      setSendAmount(newAmount);
    },
    [sendAmount]
  );

  useEffect(() => {
    const amount = textToAmount(sendAmount);
    const fee = Math.floor(amount * 0.1 * 100) / 100;
    setFee(amountToText(fee));
    const convert = amount - fee;
    setConvert(amountToText(convert));
    const newReceiveAmount = Math.ceil(convert * currentRate * 100) / 100;

    setReceiveAmount(amountToText(newReceiveAmount));
  }, [currentRate, sendAmount]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        source_currency: sendCurrency,
        source_amount: textToAmount(sendAmount),
        transaction_fee: textToAmount(fee),
        amount_to_convert: textToAmount(convert),
        conversion_rate: currentRate,
        destination_currency: receiveCurrency,
        destination_amount: textToAmount(receiveAmount),
      };
      goToNext(data);
    },
    [convert, currentRate, fee, goToNext, receiveAmount, receiveCurrency, sendAmount, sendCurrency]
  );

  return (
    <FormWrapper title="One-time Payout" subtitle="Send money internationally" onSubmit={handleSubmit}>
      <CurrencyInput
        labelText="You send"
        id="send"
        name="send"
        value={sendAmount}
        onChange={handleSendAmountChange}
        onCurrencyChange={setSendCurrency}
      />
      {sendAmount !== "" && (
        <ConversionInfo fee={fee} convert={convert} rate={currentRate} currency={sendCurrency} isLoading={isLoading} isError={isError} />
      )}
      <CurrencyInput
        labelText="Recipient gets"
        id="gets"
        name="gets"
        value={receiveAmount}
        readOnly
        defaultCurrency="EUR"
        onCurrencyChange={setReceiveCurrency}
      />

      <div className=" mt-11 sm:mt-9 grid gap-x-5 gap-y-3 sm:grid-cols-repeat">
        <Button disabled={sendAmount === ""} theme="primary-outline" type="button">
          Compare Rates
        </Button>

        <Button disabled={sendAmount === ""} type="submit">
          Continue
        </Button>
      </div>
    </FormWrapper>
  );
}

export default AmountForm;
