export const calculateValidity = (coverages: any) => {
  let minLack: number = 0;

  coverages.map((coverage: any) => {
    if (coverage.lack < minLack || minLack === 0) {
      minLack = coverage.lack;
    }
  });

  return addDays(new Date(), minLack).toISOString().substring(0, 10);
};

export const addDays = (date: Date, days: number) => {
  var ms = new Date().getTime() + 86400000 * days;
  return new Date(ms);
};
