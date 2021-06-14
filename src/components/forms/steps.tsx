import React, { useState } from "react";

function Steps({ steps, current }: { steps: React.ReactNode[]; current: number }) {
  const [currentStep] = useState(steps.length > current ? current : steps.length - 1);

  return (
    <div className="px-5 mt-7 sm:px-8 sm:left-20 sm:right-4 sm:absolute sm:top-0">
      <div className="text-xs font-medium text-gray-light sm:mx-auto sm:max-w-2xl">
        <div className="h-2 grid grid-cols-repeat justify-items-center items-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="h-1 w-full bg-gray-base first:rounded-l-md last:rounded-r-md relative sm:first:w-1/2 sm:first:justify-self-end sm:last:w-1/2 sm:last:justify-self-start"
            >
              {currentStep === idx && (
                <div className="h-2 w-2 rounded-full bg-gray-dark absolute top-[-2px] left-0"></div>
              )}
            </div>
          ))}
        </div>
        <div className="h-6 grid grid-cols-repeat justify-items-center items-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`${
                currentStep === idx ? "text-gray-dark" : ""
              } first:justify-self-start last:justify-self-end sm:first:justify-self-center sm:last:justify-self-center`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Steps;
