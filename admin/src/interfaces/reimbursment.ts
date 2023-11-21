export interface reimbursmentResponse {
  summary: {
    cases: number;
  };
  pagination: {
    total: number;
    page: number;
    records: number;
  };
  data: {
    number: number;
    date: string;
    imed_amount: number | null;
    product: string;
    assistance: string;
    available: number;
    amount: number | null;
    required_amount: number | null;
    required_imed: number;
    rut: string;
    case_type: string;
    name: string;
    status: string;
    id: string;
    limit: string;
    phone: string;
    email: string;
    is_active: boolean;
    case_id: string;
    casestage_description: string;
  }[];
}

export interface DocumentInfo {
  document_id: string;
  viewLink: string;
  file_tag: string;
}
