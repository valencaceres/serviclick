import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import TextArea from "../../../ui/TextArea/TextArea";
import Button from "../../../ui/Button";

import { useAssistance } from "../../../../hooks";

const AssistanceBenefits = ({
  setShowModal,
  benefitValue,
  setBenefitValue,
}: any) => {
  const { assistance, setAssistance } = useAssistance();

  const handleClickAddBenefit = () => {
    setAssistance({
      ...assistance,
      benefits: [...assistance.benefits, benefitValue],
    });
    setShowModal(false);
  };

  useEffect(() => {
    setBenefitValue({ id: "", description: "" });
  }, []);

  return (
    <ContentCell gap="30px" align="center">
      <TextArea
        id="txtName"
        label="Prestación"
        width="700px"
        height="200px"
        value={benefitValue.description}
        onChange={(e: any) =>
          setBenefitValue({ id: "", description: e.target.value })
        }
      />
      <Button
        text="Registrar"
        width="150px"
        onClick={handleClickAddBenefit}
        enabled={benefitValue.description !== ""}
      />
    </ContentCell>
  );
};

export default AssistanceBenefits;
