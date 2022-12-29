import { ISpecialty } from "./specialty";
import { IDistrict } from "./district";

export interface ISpecialist {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  birthDate: string;
  specialties: ISpecialty[];
  districts: IDistrict[];
}
