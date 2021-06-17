import React, { useMemo } from "react";
import cn from "classnames";

import FormWrapper from "../formWrapper";

import { formatCurrency } from "../../../lib/formatCurrency";
import Button from "../button";

function ReviewFormRow({ label, value, size = "regular" }: { label: string; value: string; size?: "regular" | "big" }) {
  return (
    <div className="w-full mt-2 first:mt-0 flex justify-between items-center">
      <div className="text-xs text-gray-base">{label}</div>
      <div
        className={cn({
          "text-xs": size === "regular",
          "text-base font-medium": size === "big",
          "text-gray-darkest": true,
        })}
      >
        {value}
      </div>
    </div>
  );
}

function ReviewForm({ goToNext, data: d }: { goToNext: Function; data: any }) {
  const data = useMemo(() => {
    console.log("We reached here first?", d);
    return {
      ...d,
      source_amount: formatCurrency(d.source_amount).value,
      transaction_fee: formatCurrency(d.transaction_fee).value,
      amount_to_convert: formatCurrency(d.amount_to_convert).value,
      destination_amount: formatCurrency(d.destination_amount).value,
      first_name: d.fullname.split(" ")[0],
    };
  }, [d]);

  return (
    <FormWrapper title="Review details of your transfer">
      <ReviewFormRow label="You send" value={`${data.source_amount} ${data.source_currency}`} size="big" />
      <ReviewFormRow label="Total fees (included)" value={`${data.transaction_fee} ${data.source_currency}`} />
      <ReviewFormRow label="Amount we'll convert" value={`${data.amount_to_convert} ${data.source_currency}`} />
      <ReviewFormRow label="Guaranteed rate" value={data.conversion_rate} />
      <ReviewFormRow
        label={`${data.first_name} gets`}
        value={`${data.destination_amount} ${data.destination_currency}`}
        size="big"
      />

      <div className="mt-10" />

      <ReviewFormRow label="Name" value={data.fullname} />
      {data.email && <ReviewFormRow label="Email address" value={data.email} />}
      {data.swift && <ReviewFormRow label="SWIFT / BIC code" value={data.swift} />}
      <ReviewFormRow label="IBAN / Account number" value={data.iban_acc} />

      <Button
        theme="secondary"
        type="submit"
        className="mt-16 sm:mt-9"
        disabled
        onClick={(e) => {
          e.preventDefault();
          // goToNext();
        }}
      >
        Continue
      </Button>
    </FormWrapper>
  );
}

export default ReviewForm;
