export interface IProduct {
  id: string,
  name: string,
  description: string,
  price: number,
  baseprice: number,
  discount_percent: number,
  beneficiary_price: number,
  hiring_conditions: string,
  assistances: IAssistance[]
}

export interface IProductsDetails {
  id: string;
  productPlan_id: string;
  description: string;
  name: string;
  currency: string;
  frequency: string;
  price: number;
  basePrice: number;
  beneficiary_price: number;
  yearly_price: number;
  yearly_plan_id: number;
  pdfBase64: string;
}

export interface IAssistance {
  id: string;
  name: string;
  description: string
  maximum: string;
  amount: number;
  currency: string;
  events: number;
  lack: number;
}

export interface IProductDetail {
  product_id: string;
  product_name: string;
  family_id: string;
  family_name: string;
  product_cost: number;
  frequency_code: string;
  term: string;
  beneficiaries: number;
  currency: string;
  due_day: number;
  productplan_id: string;
  price: {
    base_price: number;
    price: number;
    beneficiary_price: number;
  };
  description: {
    title: string;
    sub_title: string;
    alias: string;
    promotional: string;
    description: string;
    territorial_scope: string;
    hiring_conditions: string;
  };
  assistances: Assistance[];
}

interface Assistance {
  assistance_id: string;
  assistance_name: string;
  family_id: string;
  family_name: string;
  amount: number;
  maximum: string;
  events: number;
  lack: number;
  currency: string;
}
