import React from "react";
import { RegisterOptions } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  labelText: string;
  register?: Function;
  options?: RegisterOptions;
  errors?: any;
};

function Input({ labelText, id, register, options, errors, ...props }: InputProps) {
  return (
    <div className="mt-[10px] first:mt-0">
      <label htmlFor={id} className="text-xs text-gray-base">
        {labelText}
      </label>
      <input
        id={id}
        name={id}
        className=" mt-1 w-full h-12 border border-gray-base rounded px-3 py-2 text-sm text-primary-accent"
        {...props}
        {...(register ? register(id, options) : {})}
      />
      {errors && errors[id] && <span data-testid={id}>{ errors[id].message }</span>}
    </div>
  );
}

export default Input;
