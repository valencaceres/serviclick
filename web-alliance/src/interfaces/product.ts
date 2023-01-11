export interface IProduct {
  id: string;
  familyId: string;
  name: string;
  cost: number;
  isSubject: boolean;
  frequency: string;
  term: string;
  beneficiaries: number;
  currency: string;
  minInsuredCompanyPrice: number;
  dueDay: number;
}

export interface IProductPlan {
  id: string;
  createDate: string;
  productId: string;
  planId: number;
  customerType: string;
  price: number;
  frequencyCode: string;
  agentId: string;
  trialCicles: number;
}
