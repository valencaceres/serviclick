export interface Ticket {
  id: string;
  leadId: string;
  insured: {
    id: string;
    rut: string;
    fullName: string;
    email: string;
    phone: string;
  };
  beneficiary: {
    id: string;
    rut: string;
    fullName: string;
    email: string;
    phone: string;
  };
  product: {
    id: string;
    name: string;
  };
  assistance: {
    id: string;
    name: string;
  };
  eventDescription: string;
  tentative: {
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
  };
  scheduled: {
    date: string;
    time: string;
  };
  confirmed: {
    date: string;
    time: string;
  };
  caseId: string;
  createdAt: string;
  updatedAt: string;
}
