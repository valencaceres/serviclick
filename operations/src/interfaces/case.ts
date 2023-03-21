export interface IData {
  beneficiary: IBeneficiary;
  products: IProduct[];
}

export interface IBeneficiary {
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

export interface IProduct {
  id: string;
  name: string;
  assistance: IAssistance[];
}

export interface IAssistance {
  name: string;
  amount: number;
  currency: string;
  maximum: number;
  events: number;
  lack: number;
}
