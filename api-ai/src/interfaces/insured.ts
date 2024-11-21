export interface InsuredByRut {
  insured: Insured;
  products: Product[];
}

interface Product {
  broker: Broker;
  customer: Customer;
  product: ProductItem;
}

interface ProductItem {
  name: string;
  description: string;
  price: number;
  currency: string;
  frequency: string;
  properties: Property[];
  assistances: Assistance[];
  beneficiaries?: Beneficiary[];
  collect: Collect;
  policy: Policy;
}

interface Property {
  name: string;
  value: string;
}

interface Policy {
  buy: string;
  init: string;
  end?: string;
  number: number;
}

interface Collect {
  feeValue?: number;
  freeMonths?: number;
  feesCharged?: number;
  charged?: number;
  paid?: number;
  balance: number;
}

interface Assistance {
  name: string;
  description: string;
  limit: string;
  events: number;
  lack: number;
  used: Used;
}

interface Used {
  events: number;
  refund?: null | number;
  imed?: null | number;
}

interface Customer {
  rut: string;
  name: string;
  paternalLastname: string;
  maternalLastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

interface Broker {
  rut: string;
  name: string;
}

interface Insured {
  rut: string;
  name: string;
  paternalLastname: string;
  maternalLastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface Beneficiary {
  rut: string;
  name: string;
  paternalLastname: string;
  maternalLastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthdate: string;
}
