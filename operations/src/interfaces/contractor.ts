export interface ISubscription {
  subscription_id: number;
  product_id: string;
  product_name: string;
  createDate: string;
}

export interface IContractor {
  id: string;
  type: string;
  rut: string;
  fullName: string;
  name: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  quantity: number;
  subscriptions: ISubscription[];
  payment: IContractorPayment[];
}

export interface IContractorAssistance {
  name: string;
  amount: number;
  currency: string;
  maximum: string;
  events: number;
  lack: number;
}

export interface IContractorBeneficiary {
  id: string;
  rut: string;
  birthdate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

export interface IContractorInsured {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

export interface IContractorSubscription {
  subscription_id: string;
  product_id: string;
  product_name: string;
  frequency: string;
  price: number;
  currency_code: string;
  createDate: string;
  startDate: string;
  assistances: IContractorAssistance[];
  insured: IContractorInsured[];
}

export interface IContractorPayment {
  subscription_id: number;
  product_id: string;
  product_name: string;
  createDate: string;
  frequency: string;
  price: number;
  insured: number;
  collected_dues: number;
  collected_amount: number;
  paid_dues: number;
  paid_amount: number;
}
