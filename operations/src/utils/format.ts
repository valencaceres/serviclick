const currencyFormat = (number: number) => {
  return number.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

const formatAmount = (amount: string, currency: string) => {
  if (amount === "0") {
    return "";
  }
  if (currency === "P") {
    return `$${parseInt(amount).toLocaleString("en-US").replace(",", ".")}`;
  } else {
    return `${amount} UF`;
  }
};

export { currencyFormat, formatAmount };
