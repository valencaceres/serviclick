import { ISpecialty } from "./specialty";

export interface IPartner {
  id: string;
  rut: string;
  name: string;
  legalrepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  specialties: ISpecialty[];
}

export interface IPartnerItem {
  id: any;
  data: IPartner;
  district: string | null;
  address: string | null;
}

export interface IPartnerFamily {
  id: string;
  name: string;
}
