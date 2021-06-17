import React from "react";

function Header() {
  return (
    <header className="w-full px-5 border-b border-gray-lightest flex-none sm:px-8 md:px-12">
      <div className="h-20 flex items-center justify-between sm:mx-auto sm:max-w-4xl">
        <img src="/logo-with-text192.png" alt="fliqpay" className=" h-8" />

        <div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.333 0.666504L0.666992 13.3332M0.666992 0.666504L13.333 13.3332L0.666992 0.666504Z"
              stroke="#918DAB"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;