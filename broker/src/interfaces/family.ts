interface Product {
  id: string;
  productPlan_id: string;
  name: string;
  currency: string;
  frequency: string;
  price: number;
}

export interface IFamily {
  id: string;
  icon: string;
  name: string;
  products: Product[];
}
