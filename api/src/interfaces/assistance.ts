import { IFamily } from "./family";
import { IValue } from "./value";
import { IBenefit } from "./benefit";
import { IExclusion } from "./exclusion";
import { IDocument } from "./document";
import { ISpecialty } from "./specialty";

export interface IAssistance {
  id: string;
  name: string;
  description: string;
  family: IFamily;
  values: IValue[];
  benefits: IBenefit[];
  exclusions: IExclusion[];
  documents: IDocument[];
  specialties: ISpecialty[];
}
