import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Beneficiary from "../../../components/functional/_beneficiary";

import ButtonIcon from "../../../components/ui/ButtonIcon";
import FloatMenu from "../../../components/ui/FloatMenu";

import { useUI, useDistrict, useBeneficiary, useLead } from "../../../hooks";

type ValueT = {
  value: string;
  isValid: boolean;
};

type BeneficiaryFormT = {
  rut: ValueT;
  birthDate: ValueT;
  name: ValueT;
  paternalLastName: ValueT;
  maternalLastName: ValueT;
  address: ValueT;
  district: ValueT;
  email: ValueT;
  phone: ValueT;
};

const SaleBeneficiaryCompanyPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    addBeneficiary,
    deleteBeneficiary,
    list: beneficiaryList,
  } = useBeneficiary();
  const { setLeadInsured, lead } = useLead();

  const initialDataBeneficiary: BeneficiaryFormT = {
    rut: { value: "", isValid: false },
    birthDate: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    address: { value: "", isValid: false },
    district: { value: "", isValid: false },
    email: { value: "", isValid: false },
    phone: { value: "", isValid: false },
  };

  const [beneficiaryForm, setBeneficiaryForm] = useState<BeneficiaryFormT>(
    initialDataBeneficiary
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/sale/contract/customer");
  };

  const handleClickAdd = () => {
    addBeneficiary({
      id: "",
      rut: beneficiaryForm.rut.value,
      name: beneficiaryForm.name.value,
      paternalLastName: beneficiaryForm.paternalLastName.value,
      maternalLastName: beneficiaryForm.maternalLastName.value,
      birthDate: beneficiaryForm.birthDate.value,
      address: beneficiaryForm.address.value,
      district: beneficiaryForm.district.value,
      email: beneficiaryForm.email.value,
      phone: beneficiaryForm.phone.value,
    });
    setShowModal(false);
  };

  const handleClickEdit = (beneficiaryItem: any) => {
    setBeneficiaryForm({
      rut: { value: beneficiaryItem.rut, isValid: true },
      birthDate: { value: beneficiaryItem.birthDate, isValid: true },
      name: { value: beneficiaryItem.name, isValid: true },
      paternalLastName: {
        value: beneficiaryItem.paternalLastName,
        isValid: true,
      },
      maternalLastName: {
        value: beneficiaryItem.maternalLastName,
        isValid: true,
      },
      address: { value: beneficiaryItem.address, isValid: true },
      district: { value: beneficiaryItem.district, isValid: true },
      email: { value: beneficiaryItem.email, isValid: true },
      phone: { value: beneficiaryItem.phone, isValid: true },
    });
    setShowModal(true);
  };

  const handleClickDelete = (rut: string) => {
    deleteBeneficiary(rut);
  };

  const handleClickRegister = () => {
    setLeadInsured([{ ...lead.insured[0], beneficiaries: beneficiaryList }]);

    router.push("/sale/payment");
  };

  useEffect(() => {
    setTitleUI("Beneficiarios");
    setBeneficiaryForm(initialDataBeneficiary);
    listAllDistrict();
  }, []);

  useEffect(() => {
    setIsButtonEnabled(beneficiaryList.length > 0);
  }, [beneficiaryList.length]);

  return (
    <Fragment>
      <Beneficiary
        beneficiaryForm={beneficiaryForm}
        setBeneficiaryForm={setBeneficiaryForm}
        addBeneficiary={handleClickAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        editBeneficiary={handleClickEdit}
        deleteBeneficiary={handleClickDelete}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickRegister}
          //disabled={!isButtonEnabled}
        />
      </FloatMenu>
    </Fragment>
  );
};

export default SaleBeneficiaryCompanyPage;
