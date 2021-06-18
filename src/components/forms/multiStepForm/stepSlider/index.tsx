import React, { useMemo } from "react";
import cn from "classnames";

type StepSliderProps = { steps: string[]; current: number };

function StepSlider({ steps, current }: StepSliderProps) {
  const currentStep = useMemo(() => (steps.length > current ? current : steps.length - 1), [current, steps]);

  return (
    <div className="px-5 mt-7 sm:px-8 sm:left-20 sm:right-4 sm:absolute sm:top-0">
      <div className="text-xs font-medium text-gray-light sm:mx-auto sm:max-w-2xl">
        <div className="h-2 grid grid-cols-repeat justify-items-center items-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              data-testid="stepBars"
              className={cn(
                "h-1 w-full first:rounded-l-md last:rounded-r-md relative sm:first:w-1/2 sm:first:justify-self-end sm:last:w-1/2 sm:last:justify-self-start",
                { "bg-primary": currentStep > idx, "bg-gray-base": currentStep < idx },
                currentStep === idx &&
                  (idx === 0
                    ? "bg-gray-base"
                    : idx + 1 === steps.length
                    ? "bg-gradient-to-r from-primary via-primary to-gray-dark"
                    : "custom-gradient")
              )}
            >
              {currentStep === idx && (
                <div
                  data-testid="stepIndicator"
                  className={cn(
                    "h-2 w-2 rounded-full bg-gray-dark absolute top-[-2px]",
                    idx === 0 ? "left-0" : idx + 1 === steps.length ? "right-0" : "left-1/2 -ml-1"
                  )}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="h-6 grid grid-cols-repeat justify-items-center items-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={cn(
                "first:justify-self-start last:justify-self-end sm:first:justify-self-center sm:last:justify-self-center",
                { "text-gray-dark": currentStep === idx, "text-primary-tint": currentStep > idx }
              )}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepSlider;
