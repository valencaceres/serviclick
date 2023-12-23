export interface IRetProduct {
  id: string;
  name: string;
  productplan_id: string;
}

export interface IRetail {
  id: string;
  rut: string;
  name: string;
  products: IRetProduct[];
}
