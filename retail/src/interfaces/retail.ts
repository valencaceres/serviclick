export interface Retail {
  id: string;
  rut: string;
  name: string;
}

export interface Retail64 {
  data: string
}

interface CollectionFee {
  quantity: number;
  free: number;
}

interface Collection {
  fee: CollectionFee;
  charged: number;
  paid: number;
  due: number;
}

interface Customer {
  id: string;
  rut: string;
  name: string;
  email: string;
  phone: string;
}

interface Product {
  id: string;
  name: string;
  incorporation: string;
  price: number;
}

interface DetailItem {
  customer: Customer;
  product: Product;
  collection: Collection;
}

interface Summary {
  quantity: number | null;
  charged: number | null;
  paid: number | null;
  due: number | null;
}

export interface DataStructure {
  summary: Summary;
  detail: DetailItem[];
}
