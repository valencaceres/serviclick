export const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("de-DE").format(number);
}