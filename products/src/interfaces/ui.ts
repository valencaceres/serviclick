export interface IStage {
  code: string;
  name: string;
}

interface IBreadCumb {
  number: number;
  code: string;
  text: string;
  link: string;
}
export interface IUI {
  slugCode: string;
  customerType: string;
  title: string;
  stage: IStage;
  lead_id: string;
  channel: { id: string; name: string };
  agent: { id: string; name: string };
  userId: string;
  product: {
    id: string;
    name: string;
    price: number;
    plan_id: number;
    productPlan_id: string;
  };
  breadCumbs: IBreadCumb[];
}
