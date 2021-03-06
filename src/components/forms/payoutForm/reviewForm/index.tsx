import React, { useMemo } from "react";
import cn from "classnames";

import FormWrapper from "../formWrapper";

import { amountToText } from "../../../../lib/formatCurrency";
import Button from "../../shared/button";

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
  const data = useMemo(
    () => ({
      ...d,
      source_amount: amountToText(d.source_amount),
      transaction_fee: amountToText(d.transaction_fee),
      amount_to_convert: amountToText(d.amount_to_convert),
      destination_amount: amountToText(d.destination_amount),
      first_name: d.fullname.split(" ")[0],
    }),
    [d]
  );

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
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
      >
        Continue
      </Button>
    </FormWrapper>
  );
}

export default ReviewForm;
