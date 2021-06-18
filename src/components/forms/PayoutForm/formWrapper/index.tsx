import React from "react";

import FormHeader from "./formHeader";

type FormWrapperProps = React.FormHTMLAttributes<HTMLFormElement> & { title: string, subtitle?: string }

function FormWrapper({ children, title, subtitle, ...props }: FormWrapperProps) {
  return (
    <>
      <FormHeader title={title} subtitle={subtitle} />
      <form className="mt-5" {...props}>
        {children}
      </form>
    </>
  )
}

export default FormWrapper