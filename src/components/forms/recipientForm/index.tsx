import React, { useState } from "react";
import cn from "classnames";

import FormWrapper from "../formWrapper";
import Input from "./input";

function RecipientForm({ goToNext }: { goToNext: Function }) {
  const [insideEurope, setInsideEurope] = useState(true);

  return (
    <FormWrapper title="Your recipient" subtitle="Who are you sending money to?">
      <Input labelText="Their email (optional)" id="email" type="email" />
      <Input labelText="Full name of the account holder" id="fullname" type="text" />
      <h3 className=" mt-4 pb-3 text-sm font-medium text-primary-accent border-b border-gray-light">Bank Details</h3>

      <div className="mt-5">
        <div className="border-b border-gray-light">
          <button
            type="button"
            className={cn(
              "text-sm px-4 pb-2",
              insideEurope ? "font-medium text-primary border-b-2 border-primary" : "text-gray-base"
            )}
            onClick={() => setInsideEurope(true)}
          >
            Inside Europe
          </button>
          <button
            type="button"
            className={cn(
              "text-sm px-4 pb-2",
              !insideEurope ? "font-medium text-primary border-b-2 border-primary" : "text-gray-base"
            )}
            onClick={() => setInsideEurope(false)}
          >
            Outside Europe
          </button>
        </div>
        {insideEurope ? (
          <div className="mt-5">
            <Input labelText="IBAN" placeholder="DE98370440018929829032" id="iban" type="text" />
          </div>
        ) : (
          <div className="mt-5">
            <Input labelText="SWIFT / BIC code" placeholder="BUKBGB22" id="swift" type="text" />
            <Input labelText="IBAN / Account Number" placeholder="01234567891" id="acc" type="text" />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="h-12 mt-7 w-full rounded-md font-medium text-sm bg-primary disabled:bg-muted text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:bg-primary-accent hover:bg-primary-accent"
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
      >
        Continue
      </button>
    </FormWrapper>
  );
}

export default RecipientForm;
