import React from "react";

function Amount() {
  return (
    <>
      <h2 className="text-xl font-medium text-[#2C0C6A] sm:text-base">One-time Payout</h2>
      <p className="text-base text-[#877E9E] sm:text-sm">Send money internationally</p>
      <form className="mt-5">
        <div className="h-16 border border-[#E8E8E8] rounded flex relative mt-5 first:mt-0">
          <label htmlFor="send" className=" text-xs text-[#8B8F96] absolute top-2 left-4">
            You send
          </label>
          <input type="text" name="send" id="send" className="h-full w-[72%] pt-7 pb-2 px-4 text-lg text-[#2C0C6A]" />
          <div className="h-full w-[28%] px-3 bg-[#F4F3F8] flex items-center">
            <img
              src="https://flagcdn.com/h20/us.png"
              alt="US flag"
              className="w-[18px] h-[18px] rounded-full object-cover sm:w-5 sm:h-5"
            />
            <select className="ml-1 sm:ml-3 bg-transparent text-xs font-medium flex-auto sm:text-sm">
              <option>USD</option>
            </select>
          </div>
        </div>
        <div className="h-16 border border-[#E8E8E8] rounded flex relative mt-5 first:mt-0">
          <label htmlFor="send" className=" text-xs text-[#8B8F96] absolute top-2 left-4">
            Recipient gets
          </label>
          <input type="text" name="send" id="send" className="h-full w-[72%] pt-7 pb-2 px-4 text-lg text-[#2C0C6A]" />
          <div className="h-full w-[28%] px-3 bg-[#F4F3F8] flex items-center">
            <img
              src="https://flagcdn.com/h20/eu.png"
              alt="US flag"
              className="w-[18px] h-[18px] rounded-full object-cover sm:w-5 sm:h-5"
            />
            <select className="ml-1 sm:ml-3 bg-transparent text-xs font-medium flex-auto sm:text-sm">
              <option>EUR</option>
            </select>
          </div>
        </div>

        <div className=" mt-11 sm:mt-9 grid gap-x-5 gap-y-3 sm:grid-cols-repeat">
          <button className="h-12 rounded-md font-medium text-sm border border-[#4305EB] text-[#4305EB] disabled:border-[#A98CF6] disabled:text-[#A98CF6]">
            Compare Rates
          </button>
          <button className="h-12 rounded-md font-medium text-sm bg-[#4305EB] disabled:bg-[#A98CF6] text-white">
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

export default Amount;