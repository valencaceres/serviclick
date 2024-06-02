import { IRol } from "./rol";

export interface IUserList {
  id: string;
  personId: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  districtName: string;
  email: string;
  phone: string;
}
[];

export interface IUser {
  id: string;
  personId: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  districtName?: string;
  email: string;
  phone: string;
  roles: IRol[];
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
