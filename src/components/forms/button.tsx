import React from "react";
import cn from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "primary" | "primary-outline" | "secondary";
};

function Button({ theme = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        {
          "h-12 w-full rounded-md font-medium text-sm": true,
          "bg-primary disabled:bg-primary-muted text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:bg-primary-accent hover:bg-primary-accent":
            theme === "primary",
          "border border-primary text-primary disabled:border-primary-muted disabled:text-primary-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:bg-primary focus:text-white hover:bg-primary hover:text-white":
            theme === "primary-outline",
          "bg-secondary text-white": theme === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
