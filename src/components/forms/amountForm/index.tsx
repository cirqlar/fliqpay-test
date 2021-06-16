import React from "react";

import FormWrapper from "../formWrapper";
import CurrencyInput from "./currencyInput";

function AmountForm({ goToNext }: { goToNext: Function }) {
  return (
    <FormWrapper title="One-time Payout" subtitle="Send money internationally">
      <CurrencyInput labelText="You send" id="send" name="send" />
      <CurrencyInput labelText="Recipient gets" id="gets" name="gets" value="1000" readOnly defaultCountryCode="eu" />

      <div className=" mt-11 sm:mt-9 grid gap-x-5 gap-y-3 sm:grid-cols-repeat">
        <button className="h-12 rounded-md font-medium text-sm border border-[#4305EB] text-[#4305EB] disabled:border-[#A98CF6] disabled:text-[#A98CF6]">
          Compare Rates
        </button>
        <button
          className="h-12 rounded-md font-medium text-sm bg-[#4305EB] disabled:bg-[#A98CF6] text-white"
          onClick={(e) => {
            e.preventDefault();
            goToNext();
          }}
        >
          Continue
        </button>
      </div>
    </FormWrapper>
  );
}

export default AmountForm;
