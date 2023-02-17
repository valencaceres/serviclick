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
}

export const stages: IStage[] = [
  {
    code: "description",
    name: "Descripción del producto",
    component: <Description />,
  },
  {
    code: "contractor",
    name: "Datos del Contratante",
    component: <Contractor />,
  },
  { code: "insured", name: "Datos del Beneficiario", component: <Insured /> },
  { code: "product", name: "Datos del Producto", component: <Product /> },
  {
    code: "beneficiaries",
    name: "Datos de las Cargas",
    component: <Beneficiary />,
  },
  { code: "payment", name: "Pago", component: <Payment /> },
];
