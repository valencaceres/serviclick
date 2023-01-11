import { useState, useEffect } from "react";

import { ContentCell } from "../../../layout/Content";

import TextArea from "../../../ui/TextArea/TextArea";
import Button from "../../../ui/Button";

import { useAssistance } from "../../../../hooks";

const AssistanceExclusions = ({
  setShowModal,
  exclusionValue,
  setExclusionValue,
}: any) => {
  const { assistance, setAssistance } = useAssistance();

  const handleClickAddExclusion = () => {
    setAssistance({
      ...assistance,
      exclusions: [...assistance.exclusions, exclusionValue],
    });
    setShowModal(false);
  };

  useEffect(() => {
    setExclusionValue({ id: "", description: "" });
  }, []);

  return (
    <ContentCell gap="30px" align="center">
      <TextArea
        id="txtName"
        label="Exclusión"
        width="700px"
        height="200px"
        value={exclusionValue.description}
        onChange={(e: any) =>
          setExclusionValue({ id: "", description: e.target.value })
        }
      />
      <Button
        text="Registrar"
        width="150px"
        onClick={handleClickAddExclusion}
        enabled={exclusionValue.description !== ""}
      />
    </ContentCell>
  );
};

export default AssistanceExclusions;
