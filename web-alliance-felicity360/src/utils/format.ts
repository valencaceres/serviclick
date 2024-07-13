const formatPrice = (value: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return "";
  }
  return numericValue.toLocaleString("es-CL");
};

export { formatPrice };
