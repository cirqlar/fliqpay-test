import React from "react";
import CurrencyInput from "./currencyInput";

function Amount({ goToNext }: { goToNext: Function }) {  
  return (
    <>
      <h2 className="text-xl font-medium text-primary-accent sm:text-base">One-time Payout</h2>
      <p className="text-base text-primary-grayed sm:text-sm">Send money internationally</p>
      <form className="mt-5">
        <CurrencyInput labelText="You send" id="send" name="send" />
        <CurrencyInput labelText="Recipient gets" id="gets" name="gets" value="1000" readOnly defaultCountryCode="eu" />

        <div className=" mt-11 sm:mt-9 grid gap-x-5 gap-y-3 sm:grid-cols-repeat">
          <button className="h-12 rounded-md font-medium text-sm border border-[#4305EB] text-[#4305EB] disabled:border-[#A98CF6] disabled:text-[#A98CF6]">
            Compare Rates
          </button>
          <button className="h-12 rounded-md font-medium text-sm bg-[#4305EB] disabled:bg-[#A98CF6] text-white" onClick={ (e) =>{ e.preventDefault(); goToNext() }}>
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

export default Amount;