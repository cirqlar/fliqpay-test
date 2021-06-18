import React from "react";

function FormHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <h2 className="text-xl font-medium text-primary-accent sm:text-base">{title}</h2>
      {subtitle && <p className="text-base text-primary-grayed sm:text-sm">{subtitle}</p>}
    </>
  );
}

export default FormHeader;
