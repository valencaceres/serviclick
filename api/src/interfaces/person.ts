export interface IPerson {
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
}
export interface IClerkUser {
  name: string;
  last_name: string;
  role_admin: string;
  role_broker: string;
  role_operations: string;
  role_serviclick: string;
  role_retail: string;
  type_role_admin: "user" | "admin" | "moderator";
  type_role_broker: "user" | "admin" | "moderator";
  type_role_operations: "user" | "admin" | "moderator";
  type_role_serviclick: "user" | "admin" | "moderator";
  type_role_retail: "user" | "admin" | "moderator";
  email_address: string;
  password: string;
}
