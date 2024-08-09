export interface IFieldFormString {
  value: string;
  isValid: boolean;
}

export interface IFieldFormNumber {
  value: number;
  isValid: boolean;
}

export interface IFieldFormBoolean {
  value: boolean;
  isValid: boolean;
}

export interface IFieldFormCustomerType {
  value: "p" | "c";
  isValid: boolean;
}
