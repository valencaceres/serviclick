import Description from "@/components/functional/wizard/Description";
import Contractor from "@/components/functional/wizard/Contractor";
import Insured from "@/components/functional/wizard/Insured";
import Product from "@/components/functional/wizard/Product";
import Beneficiary from "@/components/functional/wizard/Beneficiary";
import Payment from "@/components/functional/wizard/Payment";

export interface IStage {
  code: string;
  name: string;
  component: any;
  number: number;
}

export const stages: IStage[] = [
  {
    code: "contractor",
    name: "Datos del Contratante",
    component: <Contractor />,
    number: 1,
  },
  {
    code: "insured",
    name: "Datos del Beneficiario",
    component: <Insured />,
    number: 2,
  },
  {
    code: "product",
    name: "Datos del Producto",
    component: <Product />,
    number: 3,
  },
  {
    code: "beneficiaries",
    name: "Datos de las Cargas",
    component: <Beneficiary />,
    number: 4,
  },
  { code: "payment", name: "Pago", component: <Payment />, number: 5 },
];
