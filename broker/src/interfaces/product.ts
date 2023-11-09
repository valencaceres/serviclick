export interface IProduct {
  id: string;
  productPlan_id: string;
  name: string;
  currency: string;
  frequency: string;
  price: number;
}

export interface IProductPlan {
  agent_id: string;
  baseprice: number;
  createdate: Date;
  discount_cicles: number;
  discount_percent: number;
  discount_type: string;
  frequency: string;
  id: string;
  plan_id: number;
  price: number;
  product_id: string;
  type: "company" | "customer";
}
