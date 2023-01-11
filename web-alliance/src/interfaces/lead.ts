import { IInsured } from "./insured";
import { IBeneficiary } from "./beneficiary";
import { IProductPlan } from "./product";

export interface ILead {
  id: string;
  createDate: string;
  customerId: string;
  companyId: string;
  subscriptionId: number;
  agentId: string;
  paymentTypeCode: string;
  policyId: string;
  product: IProductPlan;
  insured: ILeadInsured[];
}

export interface ILeadInsured extends IInsured {
  beneficiaries: IBeneficiary[];
}
