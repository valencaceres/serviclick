export interface ISlug {
  id: string;
  code: string;
  rut: string;
  name: string;
  line: string;
  fantasyName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  logo: string;
  legalRepresentatives: ILegalRepresentative[];
  products: IProduct[];
}

interface ILegalRepresentative {
  rut: null;
  name: null;
}

interface IProduct {
  product_id: string;
  name: string;
  promotional: string;
  campaign: string;
  price: IPrice;
  currency: string;
}

interface IPrice {
  normal: number;
  company: number;
}
