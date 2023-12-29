export const dbDateToText = (date: string) => {
  return date !== "" && date?.split("-").length === 3
    ? date.split("-")[2] + "-" + date.split("-")[1] + "-" + date.split("-")[0]
    : "";
};
