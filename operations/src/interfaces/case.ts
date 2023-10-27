interface IPolicy {
  id: string;
  startDate: string;
  endDate: string;
}

interface IRetail {
  id: string;
  name: string;
}

interface ICustomer {
  id: string;
  rut: string;
  name: string;
}

interface IApplicant {
  type: string;
  id: string;
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface IProduct {
  id: string;
  name: string;
}

interface IAssistance {
  id: string;
  name: string;
  assigned: {
    amount: number;
    currency: string;
    maximum: string;
    events: number;
    lack: number;
  };
  used: {
    events: number;
    total_amount: number;
  };
}

interface IValue {
  id: string;
  name: string;
  value: string;
  family_id: string;
  line_order: number;
}

interface IEvent {
  date: string;
  location: string;
  description: string;
}

interface IFile {
  document_id: string;
  document_name: string;
  file_tag: string;
}

interface IRefund {
  amount: number;
  imed_amount: number;
  status: string;
  comment: string;
}

interface ISpecialist {
  specialist_id: string;
  specialist_name: string;
  specialty_id: string;
  specialty_name: string;
  district_id: string;
  district_name: string;
  scheduled_date: string;
  scheduled_time: string;
  confirmed: boolean;
  completed: boolean;
  qualification_id: string;
  qualification_name: string;
  comment: string;
}

interface IAlliance {
  partner_id: string;
  partner_name: string;
  specialty_id: string;
  specialty_name: string;
  scheduled_date: string;
  scheduled_time: string;
  confirmed: boolean;
  completed: boolean;
  qualification_id: string;
  qualification_name: string;
  comment: string;
}

interface ICost {
  amount: number;
  extra: number;
  comment: string;
}

interface IHistory {
  date: string;
  user: string;
  name: string;
}

export interface ICase {
  case_id: string | null;
  type: string | null;
  lead_id: string | null;
  policy: IPolicy | null;
  retail: IRetail | null;
  customer: ICustomer | null;
  insured: IApplicant | null;
  beneficiary: IApplicant | null;
  product: IProduct | null;
  assistance: IAssistance | null;
  values: IValue[] | null;
  event: IEvent | null;
  files: IFile[] | null;
  procedure_id: string | null;
  refund: IRefund | null;
  specialist: ISpecialist | null;
  alliance: IAlliance | null;
  cost: ICost | null;
  history: IHistory[] | null;
}

export interface ICaseData {
  case_id: string | null;
  user_id: string | null;
  type: string | null;
  insured_id: string | null;
  beneficiary: string | null;
  customer_id: string | null;
  retail_id: string | null;
  product_id: string | null;
  assistance_id: string | null;
  lead_id: string | null;
  values: IValue[] | null;
  event: IEvent | null;
  files: IFile[] | null;
  procedure_id: string | null;
  refund_amount: number | null;
  specialist: ISpecialist | null;
  alliance: IAlliance | null;
  cost: ICost | null;
}

export interface ICaseItem {
  id: string;
  number: number;
  createddate: string;
  customer_id: string;
  customer_name: string;
  applicant_rut: string;
  applicant_name: string;
  stage_id: string;
  stage_name: string;
}

export interface IRetailItem {
  id: string;
  name: string;
}

export interface IStatusItem {
  id: string;
  name: string;
}
