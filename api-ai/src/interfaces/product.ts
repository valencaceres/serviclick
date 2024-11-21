export interface productByRut {
  rut: string;
  name: string;
  paternalLastname: string;
  maternalLastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  products: ProductItem[];
}

export interface ProductItem {
  dates: Dates;
  insured: Insured;
  product: Product;
  beneficiaries: Beneficiary[];
}

export interface Dates {
  buy: string;
  init: string;
}

export interface Insured {
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

export interface Product {
  name: string;
  frequency: string;
  price: number;
}

export interface Beneficiary {
  rut: string;
  name: string;
  paternalLastname: string;
  maternalLastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthdate: string;
  relationship: string;
}
