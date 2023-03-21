export interface IData {
  beneficiary: IBeneficiary;
  products: IProduct[];
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
}

interface IProduct {
  id: string;
  name: string;
  assistance: IAssistance[];
}

interface IAssistance {
  name: string;
  amount: number;
  currency: string;
  maximum: number;
  events: number;
  lack: number;
}
