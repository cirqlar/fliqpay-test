import React from "react";
import cn from "classnames";

import FormWrapper from "../formWrapper";

function ReviewFormRow({ label, value, size = "regular" }: { label: string; value: string; size?: "regular" | "big" }) {
  return (
    <div className="w-full mt-2 first:mt-0 flex justify-between items-center">
      <div className="text-xs text-gray-base">{label}</div>
      <div className={cn({
        "text-xs": size === "regular",
        "text-base font-medium": size === "big",
      })}>
        {value}
      </div>
    </div>
  );
}

function ReviewForm({ goToNext }: { goToNext: Function }) {
  return (
    <FormWrapper title="Review details of your transfer">
      <ReviewFormRow label="You send" value="1,000 USD" size="big" />
      <ReviewFormRow label="Total fees (included)" value="3.69 USD" />
      <ReviewFormRow label="Amount we'll convert" value="996.31 USD" />
      <ReviewFormRow label="Guaranteed rate" value="1.10289" />
      <ReviewFormRow label="Johnny gets" value="1,248.63 EUR" size="big" />

      <div className="mt-10" />

      <ReviewFormRow label="Name" value="Johnny Gbadamosi" />
      <ReviewFormRow label="Email address" value="johnny.gbadamosi@gmail.com" />
      <ReviewFormRow label="IBAN / Account number" value="DE898919013902102" />


      <button
        type="submit"
        className="h-12 mt-16 w-full rounded-md font-medium text-sm bg-secondary disabled:bg-[#A98CF6] text-white sm:mt-9"
        onClick={(e) => {
          e.preventDefault();
          // goToNext();
        }}
      >
        Continue
      </button>
    </FormWrapper>
  );
}

export default ReviewForm;
