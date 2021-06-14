import React from "react";

import Amount from "../components/forms/amount";
import DefaultLayout from "../components/layout/defaultLayout";
import Steps from "../components/forms/steps";

function Index() {
  return (
    <DefaultLayout>
      <Steps steps={["Amount", "Recipient", "Review", "Pay"]} current={0} />
      <div className="px-5 mt-7 bg-white sm:max-w-lg sm:mx-auto sm:border sm:border-[#F2F2F2] sm:px-8 sm:pt-8 sm:pb-12">
        <Amount />
      </div>
    </DefaultLayout>
  );
}

export default Index;
