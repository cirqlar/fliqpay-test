import React, { useCallback, useMemo, useState } from "react";

import StepSlider from "./stepSlider";

export type MultiStepChildProps = {
  goToNext: (data?: any) => void;
  data: any;
  [key: string]: any;
};

export type StepType = [string, React.ComponentType<MultiStepChildProps>];

type MultiStepFormProps = {
  steps: StepType[];
  currentStepNumber?: number;
  executeBetween?: (data: any, currentStep: string) => any;
  executeAfter: (data: any, currentStep: string) => any;
};

function MultiStepForm({
  steps,
  currentStepNumber: cs,
  executeBetween = (data) => data,
  executeAfter,
}: MultiStepFormProps) {
  const [currentStepNumber, setCurrentStepNumber] = useState(cs ?? 0);
  const [currentComponentData, setCurrentComponentData] = useState<any>();
  const [numberOfSteps] = useState(steps.length);

  const stepNames = useMemo(() => {
    return steps.map(([stepName]) => stepName);
  }, [steps]);

  const CurrentComponent = useMemo(() => {
    return steps[currentStepNumber][1];
  }, [currentStepNumber, steps]);

  const goToNextStep = useCallback(
    (data?: any) => {
      if (currentStepNumber < numberOfSteps - 1) {
        const newData = executeBetween && executeBetween(data, stepNames[currentStepNumber]);
        setCurrentComponentData(newData);
        setCurrentStepNumber(currentStepNumber + 1);
      } else {
        executeAfter && executeAfter(data, stepNames[currentStepNumber]);
      }
    },
    [currentStepNumber, executeAfter, executeBetween, numberOfSteps, stepNames]
  );

  return (
    <>
      <StepSlider steps={stepNames} current={currentStepNumber} />
      <div className="px-5 my-7 bg-white sm:max-w-lg sm:mx-auto sm:border sm:border-gray-light sm:px-8 sm:pt-8 sm:pb-12 2xl:my-16">
        <CurrentComponent data={currentComponentData} goToNext={goToNextStep} />
      </div>
    </>
  );
}

export default MultiStepForm;
