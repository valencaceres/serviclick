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
  if (amount === "0") {
    return "";
  }
  if (currency === "P") {
    return `$${parseInt(amount).toLocaleString("en-US").replace(",", ".")}`;
  } else {
    return `${amount} UF`;
  }
};

function formatDate(dateString: string): string {
  const dateObject = new Date(dateString + "T00:00:00Z");

  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1;
  const year = dateObject.getUTCFullYear();

  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}

export { unFormatRut, formatRut, currencyFormat, formatAmount, formatDate };
