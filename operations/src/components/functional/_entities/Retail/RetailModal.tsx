import { useState } from "react";
import ModalWindow from "../../../ui/ModalWindow";
import RetailCompanyForm from "./RetailCompanyForm";
import RetailPersonForm from "./RetailPersonForm";

import Button from "../../../ui/Button/Button";

import { useRetail } from "../../../../hooks";
import { ContentCell } from "../../../layout/Content";

const RetailModal = ({ showRetailModal, setShowRetailModal, retail }: any) => {
  const { createRetail } = useRetail();

  const [enableSave, setEnableSave] = useState(false);

  const handleClickSave = () => {
    setShowRetailModal(false);
    createRetail(retail);
  };

  return (
    <ModalWindow
      showModal={showRetailModal}
      setClosed={() => setShowRetailModal(false)}
      title="Modificar cliente"
    >
      <ContentCell gap="20px" align="center">
        {retail?.type === "P" ? (
          <RetailPersonForm retail={retail} />
        ) : (
          <RetailCompanyForm retail={retail} />
        )}
        <Button
          text="Registrar"
          width="150px"
          onClick={handleClickSave}
          enabled={enableSave}
        />
      </ContentCell>
    </ModalWindow>
  );
};

export default RetailModal;
