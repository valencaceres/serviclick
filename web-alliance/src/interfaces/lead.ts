interface ICustomer {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

interface IValue {
  value_id: string;
  valuetype_code: string;
  family_id: string;
  family_name: string;
  value_name: string;
  value: string;
}

interface ICompany {
  id?: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

interface IProduct {
  id: string;
  price: number;
  currency_code: string;
  frequency_code: string;
  productPlan_id: number;
}

interface IBeneficiary {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  relationship: string;
}

interface IInsured {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  beneficiaries: IBeneficiary[] | [];
  values: IValue[] | [] | undefined;
}

export interface ILead {
  id: string;
  agent_id: string;
  customer: ICustomer;
  company?: ICompany;
  product: IProduct;
  insured?: IInsured[];
  link: string;
  subscription?: boolean;
  send: boolean;
}
