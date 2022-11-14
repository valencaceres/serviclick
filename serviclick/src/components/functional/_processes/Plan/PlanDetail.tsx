import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import Button from "../../../ui/Button";

import usePlan from "../../../../hooks/useProduct";

const PlanDetail = ({ savePlan }: any) => {
  const { product, resetProduct } = usePlan();

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const saveDataPlan = () => {
    savePlan(id, name, false);
    resetProduct();
  };

  useEffect(() => {
    setId(product.id);
    setName(product.name);
  }, [product]);

  return (
    <ContentCell align="center" gap="30px">
      <InputText
        id="txtPlanName"
        label="Nombre"
        width="360px"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Button
        text={product.id ? "Modificar" : "Agregar"}
        width="200px"
        onClick={saveDataPlan}
      />
    </ContentCell>
  );
};

export default PlanDetail;
