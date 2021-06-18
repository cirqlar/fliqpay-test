import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import { useForm } from "react-hook-form";

import FormWrapper from "../formWrapper";
import Input from "./input";
import Button from "../../shared/button";

function RecipientForm({ goToNext }: { goToNext: Function }) {
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      inside_europe: "true",
    },
  });
  const errors = useMemo(() => formState.errors, [formState]);

  const inside_europe = watch("inside_europe");

  const submit = useCallback(
    (data: any) => {
      const modifiedData = { ...data, inside_europe: data.inside_europe === "true" };
      goToNext(modifiedData);
    },
    [goToNext]
  );

  return (
    <FormWrapper onSubmit={handleSubmit(submit)} title="Your recipient" subtitle="Who are you sending money to?">
      <Input labelText="Their email (optional)" id="email" type="email" register={register} />
      <Input
        labelText="Full name of the account holder"
        id="fullname"
        type="text"
        register={register}
        options={{ required: "This field is required" }}
        errors={errors}
      />

      <h3 className=" mt-4 pb-3 text-sm font-medium text-primary-accent border-b border-gray-light">Bank Details</h3>

      <div className="mt-5">
        <div className="border-b border-gray-light">
          <label
            htmlFor="inside_europe"
            className={cn(
              "text-sm px-4 pb-2",
              inside_europe === "true" ? "font-medium text-primary border-b-2 border-primary" : "text-gray-base"
            )}
          >
            <input
              {...register("inside_europe", {
                required: true,
              })}
              id="inside_europe"
              type="radio"
              value="true"
              className="hidden"
            />
            Inside Europe
          </label>
          <label
            htmlFor="outside_europe"
            className={cn(
              "text-sm px-4 pb-2",
              inside_europe === "false" ? "font-medium text-primary border-b-2 border-primary" : "text-gray-base"
            )}
          >
            <input
              {...register("inside_europe", {
                required: true,
              })}
              id="outside_europe"
              type="radio"
              value="false"
              className="hidden"
            />
            Outside Europe
          </label>
        </div>
        {/* <div className="mt-5">
            <Input labelText="IBAN" placeholder="DE98370440018929829032" id="iban" type="text" />
          </div> */}
        <div className="mt-5">
          {inside_europe === "false" && (
            <Input
              labelText="SWIFT / BIC code"
              placeholder="BUKBGB22"
              id="swift"
              type="text"
              register={register}
              options={{
                required: "This field is required",
                shouldUnregister: true,
              }}
              errors={errors}
            />
          )}
          <Input
            labelText={inside_europe === "false" ? "IBAN / Account Number" : "IBAN"}
            placeholder={inside_europe === "false" ? "01234567891" : "DE98370440018929829032"}
            id="iban_acc"
            type="text"
            register={register}
            options={{
              required: "This field is required",
            }}
            errors={errors}
          />
        </div>
      </div>
      <Button type="submit" className="mt-7">Continue</Button>
    </FormWrapper>
  );
}

export default RecipientForm;
