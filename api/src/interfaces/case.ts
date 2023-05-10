export interface IData {
  customer_id: string;
  company_id: string;
  insured: IInsured;
  beneficiary: IBeneficiary;
  products: IProduct[];
}

interface IInsured {
  type: string;
  id: string;
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface IBeneficiary {
  type: string;
  id: string;
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthdate: string;
  relationship: string;
}

interface IProduct {
  id: string;
  name: string;
  assistance: IAssistance;
}

interface IAssistance {
  name: string;
  amount: number;
  currency: string;
  maximum: number;
  events: number;
  lack: number;
}
