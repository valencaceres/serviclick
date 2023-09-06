const unFormatRut = (rut: string) => {
  return rut.split(".").join("").split("-").join("");
};

const formatRut = (rut: string) => {
  return unFormatRut(rut)
    .replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4")
    .toUpperCase();
};

const currencyFormat = (number: number) => {
  return number.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

const formatAmount = (amount: string, currency: string) => {
  if (!amount || amount === "0" || amount === "") {
    return "";
  }

  if (currency === "P") {
    return `$${parseInt(amount).toLocaleString("en-US").replace(",", ".")}`;
  }

  if (currency === "U") {
    return `${amount} UF`;
  }

  return `${parseInt(amount).toLocaleString("en-US").replace(",", ".")}`;
};

export { unFormatRut, formatRut, currencyFormat, formatAmount };
