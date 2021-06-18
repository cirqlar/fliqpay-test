import React from "react";
import { render, act, screen, waitFor } from "@testing-library/react";

import Index from "./index";

it("should render", async () => {
  act(() => {
    render(<Index />);
  });

  // wait until component has finished loading
  await waitFor(() => {
    expect(screen.getAllByLabelText(/Select Currency/i)[0]).not.toHaveAttribute("disabled")
  });
});
