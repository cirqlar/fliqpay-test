import React, { useCallback, useMemo, useState } from "react";

import StepSlider from "./stepSlider";

export type MultiStepChildProps = {
  goToNext: (data?: any) => void;
  data?: any;
  [key: string]: any;
};

export type StepType = [string, React.ComponentType<MultiStepChildProps>];

type MultiStepFormProps = {
  steps: StepType[];
  currentStep?: number;
  executeAfter: (data: any) => any;
};

function MultiStepForm({ steps, currentStep: cs, executeAfter }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(cs ?? 0);
  const [currentComponentData, setCurrentComponentData] = useState<any>();
  const [numberOfSteps] = useState(steps.length);

  const stepNames = useMemo(() => {
    return steps.map(([stepName]) => stepName);
  }, [steps]);

  const CurrentComponent = useMemo(() => {
    return steps[currentStep][1];
  }, [currentStep, steps]);

  const goToNextStep = useCallback(
    (data?: any) => {
      if (currentStep < numberOfSteps - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentComponentData(data);
      } else {
        executeAfter && executeAfter(data);
      }
    },
    [currentStep, executeAfter, numberOfSteps]
  );

  return (
    <>
      <StepSlider steps={stepNames} current={currentStep} />
      <div className="px-5 mt-7 bg-white sm:max-w-lg sm:mx-auto sm:border sm:border-gray-light sm:px-8 sm:pt-8 sm:pb-12">
        <CurrentComponent data={currentComponentData} goToNext={goToNextStep} />
      </div>
    </>
  );
}

export default MultiStepForm;
