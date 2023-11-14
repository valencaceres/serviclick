export interface Customer {
  id: string;
  rut: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  frequency: string;
  currency: string;
  price: number;
}

export interface Lead {
  lead_id: string;
  date: string;
  time: string;
  customer: Customer;
  product: Product;
  code: string;
}

export interface Code {
  retail_id: string;
  data: {
    code: string;
    lead_id: string;
  }[];
}
