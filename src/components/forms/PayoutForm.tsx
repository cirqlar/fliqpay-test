import React, { useCallback, useMemo, useState } from "react";

import AmountForm from "./amountForm";
import MultiStepForm, { StepType } from "./multiStepForm";
import RecipientForm from "./recipientForm";
import ReviewForm from "./reviewForm";

function PayoutForm() {
  const [formData, setFormData] = useState({});
  const steps: StepType[] = useMemo(() => [
    ['Amount', AmountForm],
    ['Recipient', RecipientForm],
    ['Review', ReviewForm],
    ['Pay', () => <div></div>],
  ], []);

  const handleStepChange = useCallback((data, currentStep: string) => {
    switch (currentStep) {
      case 'Amount':
      case 'Recipient':
        const newData = {
          ...formData,
          ...(data ?? {})
        }
        setFormData(newData);
        return newData;
      case 'Review':
      default:
        return data;
    }
  }, [formData]);

  return <MultiStepForm steps={steps} executeBetween={handleStepChange} executeAfter={handleStepChange} />;
}

export default PayoutForm;