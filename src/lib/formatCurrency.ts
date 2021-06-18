export function textToAmount(text: string) {
  if (text === "") return 0;
  if (/[^0123456789,.]/.test(text)) throw Error("invalid token");

  const splitText = text.replaceAll(",", "").split(".");

  if (splitText.length - 1 > 1) throw Error("invalid token");
  if (splitText[0].charAt(0) === "0") splitText[0] = splitText[0].slice(1);

  return parseFloat(splitText.join("."));
}

export function amountToText(amount: number) {
  if (amount === 0) return "";
  const text = amount.toString();
  // scientific notation, number is too big
  if (/[^0123456789,.]/.test(text)) throw Error("too large");

  const splitText = text.split(".");

  // Reject decimals after two places
  if (splitText[1]?.length > 2) splitText[1] = splitText[1].slice(0, 2);

  if (splitText[0].length > 3) {
    // Add commas to front half (from: https://stackoverflow.com/a/2901298/12275857)
    splitText[0] = splitText[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return splitText.join(".");
}

export function validateText(text: string, previous: string = "") {
  if (text === "") return "";

  // Remove unwanted characters
  if (/[^0123456789,.]/.test(text)) return previous;

  const splitText = text.replaceAll(",", "").split(".");

  // Reject number with more than one dot (.)
  if (splitText.length - 1 > 1) return previous;
  if (splitText[0].charAt(0) === "0") splitText[0] = splitText[0].slice(1);
  // Reject decimals after two places
  if (splitText[1]?.length > 2) splitText[1] = splitText[1].slice(0, 2);

  if (splitText[0].length > 3) {
    // Add commas to front half (from: https://stackoverflow.com/a/2901298/12275857)
    splitText[0] = splitText[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return splitText.join(".");
}