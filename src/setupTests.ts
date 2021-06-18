// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";


// Global fetch mocks

global.fetch = (url) => {
  let data: any;
  switch (url) {
    case "/symbols":
      data = { symbols: { USD: "US Dollar", EUR: "Eurp" } };
      break;
    default:
      console.log(url);
      break;
  }
  return Promise.resolve({
    json: () => Promise.resolve(data),
  } as unknown as Response);
};
