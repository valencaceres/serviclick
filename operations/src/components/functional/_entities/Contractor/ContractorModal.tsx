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
}: any) => {
  const { contractor, createContractor } = useContractor();

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
        {contractor.type === "P" ? (
          <ContractorPersonForm enabled={true} setEnableSave={setEnableSave} />
        ) : (
          <ContractorCompanyForm enabled={true} setEnableSave={setEnableSave} />
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
