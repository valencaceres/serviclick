import { useState } from "react";
import ModalWindow from "../../../ui/ModalWindow";
import ContractorCompanyForm from "./ContractorCompanyForm";
import ContractorPersonForm from "./ContractorPersonForm";

import Button from "../../../ui/Button/Button";

import { useContractor } from "../../../../hooks";
import { ContentCell } from "../../../layout/Content";

const ContractorModal = ({
  showContractorModal,
  setShowContractorModal,
  contractor
}: any) => {
  const { createContractor } = useContractor();

  const [enableSave, setEnableSave] = useState(false);

  const handleClickSave = () => {
    setShowContractorModal(false);
    createContractor(contractor);
  };

  return (
    <ModalWindow
      showModal={showContractorModal}
      setClosed={() => setShowContractorModal(false)}
      title="Modificar cliente">
      <ContentCell gap="20px" align="center">
        {contractor?.type === "P" ? (
          <ContractorPersonForm contractor={contractor} />
        ) : (
          <ContractorCompanyForm contractor={contractor} />
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

export default ContractorModal;
