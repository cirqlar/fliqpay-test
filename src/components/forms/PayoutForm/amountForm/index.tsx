import React, { useCallback, useState } from "react";

import "./amountForm.css";

import FormWrapper from "../formWrapper";
import CurrencyInput from "./currencyInput";
import ConversionInfo from "./conversionInfo";

import { formatCurrency } from "../../../../lib/formatCurrency";
import Button from "../../shared/button";

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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (sendAmount.amount === 0) return;

      const data = {
        source_currency: sendCurrency,
        source_amount: sendAmount.amount,
        transaction_fee: formatCurrency(fee).amount,
        amount_to_convert: formatCurrency(convert).amount,
        conversion_rate: currentRate,
        destination_currency: receiveCurrency,
        destination_amount: receiveAmount.amount,
      };
      goToNext(data);
    },
    [convert, currentRate, fee, goToNext, receiveAmount, receiveCurrency, sendAmount.amount, sendCurrency]
  );

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
      {showComparison && sendAmount.amount > 0 && (
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
        <Button theme="primary-outline" type="button" onClick={() => setShowComparison(true)}>
          Compare Rates
        </Button>

        <Button disabled={sendAmount.amount === 0} type="submit">
          Continue
        </Button>
      </div>
    </FormWrapper>
  );
}

export default AmountForm;
