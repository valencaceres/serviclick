import { IPerson } from "./person";

export interface IBeneficiary extends IPerson {
  birthDate: string;
  relationship: string;
}
