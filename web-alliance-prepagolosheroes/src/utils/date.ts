export const dbDateToText = (date: string) => {
  return (
    date.split("-")[2] + "-" + date.split("-")[1] + "-" + date.split("-")[0]
  );
};
