interface IValue {
  id: string;
  valuetypeCode: string;
  family: {
    id: string;
    name: string;
  };
  name: string;
}

interface IDiscount {
  type: string;
  percent: number;
  cicles: number;
}

export interface IProduct {
  id: string;
  familyId: string;
  name: string;
 
  promotional: string;
  cost: number;
  isSubject: boolean;
  frequency: "M" | "A" | "S";
  term: string;
  beneficiaries: number;
  currency: string;
  minInsuredCompanyPrice: number;
  dueDay: number;
  plan: IProductPlan;
  assistances: IProductAssistance[];
  values: IValue[];
  discount: IDiscount;
}

export interface IProductPlan {
  id: string;
  createDate: string;
  productId: string;
  planId: number;
  customerType: string;
  beneficiary_price: number;
  baseprice: number,
  price: number;
  frequencyCode: string;
  agentId: string;
  discount: IDiscount;
}

export interface IProductAssistance {
  id: string;
  name: string;
  amount: number;
  currency: string;
  maximum: string;
  events: number;
  lack: number;
}
