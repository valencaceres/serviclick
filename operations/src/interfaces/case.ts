import { IApplicant } from "./applicant";

interface IPolicy {
  id: string | null;
  startDate: string;
  endDate: string;
}

export interface IRetail {
  id: string;
  rut?: string;
  name: string;
}

interface ICustomer {
  id: string | null;
  rut: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  productPlan_id: string;
  agent_id?: string;
  lead_id?: string;
}

export interface IAssistance {
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
  description?: string;
}

interface IFile {
  document_id: string;
  document_name: string;
  file_tag: string;
}

interface IRefund {
  amount: {
    required: number | null;
    refunded: number | null;
  };
  imed: {
    required: number | null;
    refunded: number | null;
  };
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
  cancel: boolean;
  qualification_id: string | null;
  qualification_name: string;
  comment: string;
}

interface IAlliance {
  partner_id: string;
  partner_name: string;
  partner_address: string;
  partner_district: string;
  partner_email: string;
  partner_phone: string;
  specialty_id: string;
  specialty_name: string;
  scheduled_date: string;
  scheduled_time: string;
  confirmed: boolean;
  completed: boolean;
  cancel: boolean;
  qualification_id: string | null;
  qualification_name: string;
  comment: string;
}

interface ICost {
  amount: number;
  extra: number;
  comment: string;
}

interface IHistory {
  code: string;
  date: string;
  time: string;
  user: string;
  name: string;
}

interface IStatus {
  isClosed: boolean;
  description: string;
}

export interface ICase {
  case_id: string | null;
  user_id: string;
  date: string;
  time: string;
  case_number: number;
  type: "I" | "B" | "C";
  lead_id: string;
  policy: IPolicy;
  retail: IRetail | null;
  customer: ICustomer;
  insured: IApplicant;
  beneficiary: IApplicant | null;
  product: IProduct;
  assistance: IAssistance;
  values: IValue[] | string;
  event: IEvent | null;
  files: IFile[] | null;
  procedure_id: string | null;
  refund: IRefund | null;
  specialist: ISpecialist | null;
  alliance: IAlliance | null;
  cost: ICost | null;
  history: IHistory[];
  status: IStatus;
  productplan_id: string | null;
  chatMessages: IChatMessage[];
  chatMessage: IChatMessage;
}

export interface ICaseItem {
  id: string;
  number: number;
  createddate: string;
  customer_id: string;
  customer_name: string;
  assistance_name: string;
  applicant_rut: string;
  applicant_name: string;
  stage_id: string;
  code: string;
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

export interface IAssistanceItem {
  id: string | null;
  name: string | null;
  description: string | null;
  family: {
    id: string | null;
    icon: string | null;
    name: string | null;
  } | null;
  values:
    | {
        id: string | null;
        name: string | null;
      }[]
    | null;
  specialties:
    | {
        id: string | null;
        name: string | null;
      }[]
    | null;
  documents: any[] | null;
  benefits:
    | {
        id: string | null;
        description: string | null;
      }[]
    | null;
  exclusions:
    | {
        id: string | null;
        description: string | null;
      }[]
    | null;
}

export interface IChatMessage {
  applicant_lastname: string;
  applicant_name: string;
  case_id: string;
  created_at: string;
  id: string;
  message: string;
  stage_id: string;
  type: string;
  user_id: string;
}
