interface Product {
  id: string;
  productPlan_id: string;
  name: string;
  currency: string;
  frequency: string;
  price: number;
  yearly_price: number;
  pdfBase64: string;
  yearly_plan_id: string;
}

export interface IFamily {
  id: string;
  icon: string;
  name: string;
  products: Product[];
}
