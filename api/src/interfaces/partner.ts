import { ISpecialty } from "./specialty";

export interface IPartner {
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
