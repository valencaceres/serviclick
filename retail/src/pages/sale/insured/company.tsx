import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Insured from "../../../components/functional/_insured";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import FloatMenu from "../../../components/ui/FloatMenu";

import { useUI, useDistrict, useLead } from "../../../hooks";

type ValueT = {
  value: string;
  isValid: boolean;
};

type InsuredFormT = {
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

const SaleInsuredCompanyPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const { addLeadInsured, setLeadInsured, lead } = useLead();

  const initialDataInsured: InsuredFormT = {
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

  const [insuredForm, setInsuredForm] =
    useState<InsuredFormT>(initialDataInsured);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickAdd = () => {
    setLeadInsured([
      {
        id: "",
        rut: insuredForm.rut.value,
        name: insuredForm.name.value,
        paternalLastName: insuredForm.paternalLastName.value,
        maternalLastName: insuredForm.maternalLastName.value,
        birthDate: insuredForm.birthDate.value,
        address: insuredForm.address.value,
        district: insuredForm.district.value,
        email: insuredForm.email.value,
        phone: insuredForm.phone.value,
        beneficiaries: [],
      },
      ...lead.insured.filter(
        (insuredItem: any) => insuredItem.rut !== insuredForm.rut.value
      ),
    ]);
    setShowModal(false);
  };

  const handleClickEdit = (insuredItem: any) => {
    setInsuredForm({
      rut: { value: insuredItem.rut, isValid: true },
      birthDate: { value: insuredItem.birthDate, isValid: true },
      name: { value: insuredItem.name, isValid: true },
      paternalLastName: { value: insuredItem.paternalLastName, isValid: true },
      maternalLastName: { value: insuredItem.maternalLastName, isValid: true },
      address: { value: insuredItem.address, isValid: true },
      district: { value: insuredItem.district, isValid: true },
      email: { value: insuredItem.email, isValid: true },
      phone: { value: insuredItem.phone, isValid: true },
    });
    setShowModal(true);
  };

  const handleClickDelete = (rut: string) => {
    setLeadInsured([
      ...lead.insured.filter((insuredItem: any) => insuredItem.rut !== rut),
    ]);
  };

  const handleClickRegister = () => {
    router.push("/sale/payment");
  };

  useEffect(() => {
    setTitleUI("Beneficiarios");
    setInsuredForm(initialDataInsured);
    listAllDistrict();
  }, []);

  useEffect(() => {
    setIsButtonEnabled(lead.insured.length > 0);
  }, [lead.insured.length]);

  return (
    <Fragment>
      <Insured
        insuredForm={insuredForm}
        setInsuredForm={setInsuredForm}
        addInsured={handleClickAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        editInsured={handleClickEdit}
        deleteInsured={handleClickDelete}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickRegister}
          disabled={!isButtonEnabled}
        />
      </FloatMenu>
    </Fragment>
  );
};

export default SaleInsuredCompanyPage;
