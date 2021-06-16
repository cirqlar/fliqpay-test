import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { labelText: string }

function Input({ labelText, id, ...props }: InputProps) {
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
      />
    </div>
  );
}

export default Input;