import React from "react";

import Header from "./header";

type DefaultLayoutProps = {
  children: React.ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <main className="w-full flex-auto sm:bg-gray-lightest">
        { children }
      </main>
    </div>
  );
}

export default DefaultLayout;
