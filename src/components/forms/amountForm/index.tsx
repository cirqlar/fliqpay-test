import React, { useCallback, useState } from "react";

import "./amountForm.css";

import FormWrapper from "../formWrapper";
import CurrencyInput from "./currencyInput";
import ConversionInfo from "./conversionInfo";

type InputValue = { value: string; amount: number };

function formatCurrency(text: string | number, previous: InputValue = { value: "", amount: 0 }) {
  const textString = text.toString();
  if (textString === "") return { value: textString, amount: 0 };

  // Remove unwanted characters
  if (/[^0123456789,.]/.test(textString)) return previous;

  const splitText = textString.replaceAll(",", "").split(".");
  // Reject number with more than one dot (.)
  if (splitText.length - 1 > 1) return previous;
  if (splitText[0].charAt(0) === "0") splitText[0] = splitText[0].slice(1);
  // Reject decimals after two places
  if (splitText[1]?.length > 2) splitText[1] = splitText[1].slice(0, 2);

  const amount = parseFloat(splitText.join("."));

  if (splitText[0].length > 3) {
    // Add commas to front half (from: https://stackoverflow.com/a/2901298/12275857)
    splitText[0] = splitText[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  let finalText = splitText.join(".");

  return { value: finalText, amount: amount };
}

function AmountForm({ goToNext }: { goToNext: (data?: any) => any }) {
  const [sendAmount, setSendAmount] = useState({ value: "", amount: 0 });
  const [receiveAmount, setReceiveAmount] = useState({ value: "", amount: 0 });

  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");

  const [fee, setFee] = useState("");
  const [convert, setConvert] = useState("");
  const [currentRate] = useState(1.14989);
  const [showComparison, setShowComparison] = useState(false);

  const handleSendAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newAmount = formatCurrency(e.target.value, sendAmount);
      setSendAmount(newAmount);

      const fee = Math.floor(newAmount.amount * 0.1 * 100) / 100;
      setFee(formatCurrency(fee).value);
      const convert = newAmount.amount - fee;
      setConvert(formatCurrency(convert).value);
      const newReceiveAmount = Math.ceil(convert * currentRate * 100) / 100;

      setReceiveAmount(formatCurrency(newReceiveAmount));
    },
    [currentRate, sendAmount]
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const data = {
      source_currency: sendCurrency,
      source_amount: sendAmount.amount,
      transaction_fee: fee,
      amount_to_convert: convert,
      conversion_rate: currentRate,
      destination_currency: receiveCurrency,
      destination_amount: receiveAmount,
    };
    goToNext(data);
  }, [convert, currentRate, fee, goToNext, receiveAmount, receiveCurrency, sendAmount.amount, sendCurrency]);

  return (
    <FormWrapper title="One-time Payout" subtitle="Send money internationally" onSubmit={handleSubmit}>
      <CurrencyInput
        labelText="You send"
        id="send"
        name="send"
        value={sendAmount.value}
        onChange={handleSendAmountChange}
        onCurrencyChange={setSendCurrency}
      />
      {(showComparison && sendAmount.amount > 0) && (
        <ConversionInfo fee={fee} convert={convert} rate={currentRate} currency={sendCurrency} />
      )}
      <CurrencyInput
        labelText="Recipient gets"
        id="gets"
        name="gets"
        value={receiveAmount.value}
        readOnly
        defaultCurrency="EUR"
        onCurrencyChange={setReceiveCurrency}
      />

      <div className=" mt-11 sm:mt-9 grid gap-x-5 gap-y-3 sm:grid-cols-repeat">
        <button 
          type='button'
          onClick={() => setShowComparison(true)}
          className="h-12 rounded-md font-medium text-sm border border-primary text-primary disabled:border-primary-muted disabled:text-primary-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:bg-primary focus:text-white hover:bg-primary hover:text-white"
        >
          Compare Rates
        </button>
        <button
          className="h-12 w-full rounded-md font-medium text-sm bg-primary disabled:bg-muted text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:bg-primary-accent hover:bg-primary-accent"
        >
          Continue
        </button>
      </div>
    </FormWrapper>
  );
}

export default AmountForm;
