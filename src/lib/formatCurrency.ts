type Currency = { value: string; amount: number };

export function formatCurrency(text: string | number, previous: Currency = { value: "", amount: 0 }) {
  const textString = text.toString();
  if (textString === "") return { value: textString, amount: 0 };

  // Remove unwanted characters
  if (/[^0123456789,.]/.test(textString)) return previous;

  const splitText = textString.replaceAll(",", "").split(".");
  // Reject number with more than one dot (.)
  if (splitText.length - 1 > 1) return previous;
  if (splitText[0].charAt(0) === "0") splitText[0] = splitText[0].slice(1);
  // Reject decimals after two places
  if (splitText[1]?.length > 2) splitText[1] = splitText[1].slice(0, 2);

  const amount = parseFloat(splitText.join("."));

  if (splitText[0].length > 3) {
    // Add commas to front half (from: https://stackoverflow.com/a/2901298/12275857)
    splitText[0] = splitText[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  let finalText = splitText.join(".");

  return { value: finalText, amount: amount };
}