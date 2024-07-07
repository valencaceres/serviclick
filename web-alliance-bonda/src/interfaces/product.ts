export interface IProduct {
  id: string,
  icon: string,
  name: string,
  products: IProductsDetails
}

export interface IProductsDetails {
  id: string;
  productPlan_id: string;
  description: string;
  name: string;
  currency: string;
  frequency: string;
  price: number;
  basePrice: number;
  beneficiary_price: number;
  yearly_price: number;
  yearly_plan_id: number;
  pdfBase64: string;
}


export interface IAssistance {
  id: string;
  section: string;
  name: string;
  maximum: string;
  amount: number;
  currency: string;
  events: number;
  lack: number;
  selected: boolean;
}

export interface IProductDetail {

      id: string,
      productPlan_id: string,
      name: string,
      basePrice: number,
      price: number,
      beneficiaryPrice: number,
      description:string,
      assistances: IAssistance[]
}