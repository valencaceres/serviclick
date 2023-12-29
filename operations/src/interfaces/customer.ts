export interface ICustomer {}

export interface ICustomerItem {
  id: string;
  rut: string;
  name: string;
  products: number;
}


interface Assistance {
  name: string;
  number: number;
  amount: number;
  currency: string;
  maximum: string;
  events: number;
  lack: number;
}

export interface Product {
  id: string;
  name: string;
  assistances: Assistance[];
}

interface Insured {
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

interface Beneficiary {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthDate: string;
  relationship: string | null;
}

interface Price {
  value: number;
  frequency: string;
}

interface Dates {
  purchase: string;
  init: string;
  end: string | null;
}

interface Balance {
  fee_value: number;
  free_months: number;
  fees_charged: number;
  charged: number;
  paid: number;
  balance: number;
}

export interface Origin {
  subscription_id: number;
  type: string;
  name: string;
  product: Product;
  insured: Insured;
  beneficiaries: Beneficiary[] | null;
  price: Price;
  dates: Dates;
  balance: Balance[] | null;
}

export interface IContractorData {
  customer: {
      id: string;
      rut: string;
      name: string;
      paternalLastName: string;
      maternalLastName: string;
      address: string;
      district: string;
      email: string;
      phone: string;
  };
  type: string;
  origins: Origin[];
}
