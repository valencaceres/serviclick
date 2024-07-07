const formatPrice = (value: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return "";
  }
  return numericValue.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

export { formatPrice };
