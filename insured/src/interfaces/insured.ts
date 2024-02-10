export interface IProfile {
  insured: IInsured;
  products: IProduct[];
}

export interface IInsured {
  id: string;
  rut: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  birthdate: string;
  maternallastname: string;
  paternallastname: string;
}

export interface IBeneficiary {
  id: string;
  rut: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  birthdate: string;
  maternallastname: string;
  paternallastname: string;
  relationship: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  subscription_id: string;
  beneficiaries_max: number;
  collection: ICollection[];
  assistances: IAssistance[];
  beneficiaries: IBeneficiary[];
}

export interface IAssistance {
  lack: number;
  name: string;
  amount: number;
  events: number;
  number: number;
  maximum: string;
  currency: ICurrency;
}

export enum ICurrency {
  Empty = "",
  P = "P",
  U = "U",
}

export interface ICollection {
  paid: number;
  balance: number;
  charged: number;
  fee_value: number;
  free_months: number;
  channel_name: string;
  fees_charged: number;
  customer_name: string;
  incorporation: string;
  customer_email: string;
  customer_phone: string;
}
