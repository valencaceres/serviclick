import { IPerson } from "./person";
import { ISpecialty } from "./specialty";
import { IDistrict } from "./district";

export interface ISpecialist extends IPerson {
  birthDate: string;
  specialties: ISpecialty[];
  districts: IDistrict[];
}

export interface ISpecialistItem {
  id: string;
  name: string;
}

export interface ISpecialistFamily {
  id: string;
  name: string;
}

export interface ISpecialistAssistance {
  id: string;
  name: string;
}
