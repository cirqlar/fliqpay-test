import { validateText, textToAmount, amountToText } from '.'

it("should text to amount properly", () => {
  expect(() => textToAmount("1,000,000.000.000")).toThrow("invalid token");
  expect(() => textToAmount("1,00-0,000.000")).toThrow("invalid token");
  expect(() => textToAmount("+1,000,000000")).toThrow("invalid token");

  expect(textToAmount("")).toBe(0);
  expect(textToAmount("1,999.923")).toBe(1999.923);
  expect(textToAmount("10000000")).toBe(10000000);
})

it("should amount to text properly", () => {
  expect(amountToText(0)).toBe("");
  expect(amountToText(1000000.102)).toBe("1,000,000.102")
})

it("should validate text properly", () => {
  expect(validateText("1,000,000.000.000")).toBe("");
  expect(validateText("1,00-0,000.000")).toBe("");
  expect(validateText("+1,000,000000")).toBe("");

  expect(validateText("")).toBe("");
  expect(validateText("1,999.923")).toBe("1,999.92");
  expect(validateText("1,000,0000")).toBe("10,000,000");
  expect(validateText("01,000,0000")).toBe("10,000,000");
  expect(validateText("1,00")).toBe("100");

})