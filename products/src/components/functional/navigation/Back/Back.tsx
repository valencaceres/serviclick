import React from "react";
import { useRouter } from "next/router";

import ButtonIcon from "@/components/ui/ButtonIcon";

import { useUI, useProduct, useLead } from "@/store/hooks";

const Back = () => {
  const router = useRouter();

  const { ui } = useUI();
  const { product } = useProduct();
  const { lead } = useLead();

  const handleClick = () => {
    let newStageCode = "";

    switch (ui.stage.code) {
      case "insured":
        newStageCode = "contractor";
        break;
      case "product":
        newStageCode = "insured";
        break;
      case "beneficiary":
        newStageCode =
          lead &&
          lead.insured &&
          lead.insured.length > 0 &&
          lead.insured[0].values &&
          lead.insured[0].values?.length > 0
            ? "product"
            : "contractor";
        break;
      case "payment":
        newStageCode =
          product.beneficiaries > 0
            ? "beneficiaries"
            : lead &&
              lead.insured &&
              lead.insured.length > 0 &&
              lead.insured[0].values &&
              lead.insured[0].values?.length > 0
            ? "product"
            : "contractor";
        break;
    }

    router.push(
      `/${newStageCode}?productPlanId=${ui.product.productPlan_id}&leadId=${lead.id}`
    );
  };

  return (
    <ButtonIcon iconName="chevron_left" color="gray" onClick={handleClick} />
  );
};

export default Back;
