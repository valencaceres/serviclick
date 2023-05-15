export interface IProduct {
  id: string;
  name: string;
  currency: string;
  frequency: string;
  companyprice: number;
  customerprice: number;
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
