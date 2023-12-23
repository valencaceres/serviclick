export type ProductT = {
  id: string;
  family_id: string;
  name: string;
  cost: number;
  isSubject: boolean;
  frequency: "M" | "A" | "S";
  term: number;
  beneficiaries: number;
  currency: string;
  dueDay: number;
  minInsuredCompanyPrice: number;
  title: string;
  subTitle: string;
  description: string;
  territorialScope: string;
  hiringConditions: string;
  assistances: AssistanceT[];
};

type AssistanceT = {
  id: string;
  name: string;
  amount: number;
  maximum: string;
  events: number;
  lack: number;
  currency: string;
};
