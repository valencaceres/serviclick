export const calculateValidity = (assistances: any) => {
  let minLack: number = 0;

  assistances.map((assistance: any) => {
    if (assistance.lack < minLack || minLack === 0) {
      minLack = assistance.lack;
    }
  });

  return addDays(new Date(), minLack).toISOString().substring(0, 10);
};

export const addDays = (date: Date, days: number) => {
  var ms = new Date().getTime() + 86400000 * days;
  return new Date(ms);
};
