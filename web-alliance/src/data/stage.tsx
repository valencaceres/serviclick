import Description from "../components/functional/Wizard/Description";
import Contractor from "../components/functional/Wizard/Contractor";
import Insured from "../components/functional/Wizard/Insured";
import Product from "../components/functional/Wizard/Product";
import { Beneficiary } from "../components/functional/Wizard/Beneficiary";
import Payment from "../components/functional/Wizard/Payment";

export interface IStage {
  code: string;
  name: string;
  component: any;
}

export const stages: IStage[] = [
  {
    code: "description",
    name: "Descripción",
    component: <Description />,
  },
  {
    code: "contractor",
    name: "Contratante",
    component: <Contractor />,
  },
  { code: "insured", name: "Asegurado", component: <Insured /> },
  { code: "product", name: "Producto", component: <Product /> },
  {
    code: "beneficiaries",
    name: "Cargas",
    component: <Beneficiary />,
  },
  { code: "payment", name: "Pago", component: <Payment /> },
];
