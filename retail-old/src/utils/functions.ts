import { v4 as uuidv4 } from "uuid";

export const genetateUUID = (): string => {
  return uuidv4();
};

export const addDays = (date: Date, days: number) => {
  var ms = new Date().getTime() + 86400000 * days;
  return new Date(ms);
};

export const calculateValidity = (coverages: any) => {
  let minLack: number = 0;

  coverages.map((coverage: any) => {
    if (coverage.lack < minLack || minLack === 0) {
      minLack = coverage.lack;
    }
  });

  return addDays(new Date(), minLack).toISOString().substring(0, 10);
};
