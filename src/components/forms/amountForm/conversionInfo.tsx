import React from "react";

function ConversionInfo({
  fee,
  convert,
  rate,
  currency,
}: {
  fee: string | number;
  convert: string | number;
  rate: string | number;
  currency: string;
}) {
  return (
    <div className="relative mt-4 -mb-1 ml-4 ">
      <div className="absolute bg-gray-base w-[2px] -top-4 -bottom-4 left-[9px]"></div>

      <div className="grid gap-3 justify-start infoGrid relative">
        <div className="w-5 h-5 rounded-full bg-gray-base flex items-center justify-center text-base">
          <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.39475 1.464V0.168H0.386748V1.464H5.39475Z" fill="#8B8F96" />
          </svg>
        </div>
        <div className="text-sm text-primary-grayed font-medium">{`${fee} ${currency}`}</div>
        <div className="text-sm text-primary-grayed">Transfer fee</div>

        <div className="w-5 h-5 rounded-full bg-gray-base flex items-center justify-center text-xs">
          <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.30969 1.19408V0.292084H0.029687V1.19408H5.30969ZM5.30969 3.82308V2.93208H0.029687V3.82308H5.30969Z"
              fill="#8B8F96"
            />
          </svg>
        </div>
        <div className="text-sm text-primary-grayed">{`${convert} ${currency}`}</div>
        <div className="text-sm text-primary-grayed">Amount we’ll convert</div>

        <div className="w-5 h-5 rounded-full bg-gray-base flex items-center justify-center text-xs">
          <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.18663 3.129L6.04563 0.389999H4.91263L3.50463 2.491L2.06363 0.389999H0.941626L2.77863 3.107L0.853626 6H1.96463L3.50463 3.778L5.02263 6H6.15563L4.18663 3.129Z"
              fill="#8B8F96"
            />
          </svg>
        </div>
        <div className="text-sm text-primary-accent font-medium">{rate}</div>
        <div className="text-sm text-primary-grayed">Guaranteed rate (1hr)</div>
      </div>
    </div>
  );
}

export default ConversionInfo;