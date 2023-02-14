import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { unFormatRut } from "../../../../utils/format";
import { emailRegEx } from "../../../../utils/regEx";
import { isValidRut } from "../../../../utils/validations";
import { dbDateToText } from "../../../../utils/date";

import { Content, Footer, Col, Row } from "../../../layout/Generic";

import BeneficiaryForm from "./BeneficiaryForm";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableIcons,
  TableRow,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";
import Button from "../../../ui/Button";
import ButtonIcon from "../../../ui/ButtonIcon";
import ModalWindow from "../../../ui/ModalWindow";
import Loading from "../../../ui/Loading";
import Summary from "../../../ui/Summary";

import { useUI, useProduct, useLead } from "../../../../store/hooks";

import { IFieldFormString } from "../../../../interfaces/form";
import { IBeneficiary } from "../../../../interfaces/beneficiary";

interface IBeneficiaryForm {
  rut: IFieldFormString;
  birthDate: IFieldFormString;
  name: IFieldFormString;
  paternalLastName: IFieldFormString;
  maternalLastName: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
  relationship: IFieldFormString;
}

const Beneficiary = () => {
  const router = useRouter();

  const initialDataForm = {
    birthDate: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    relationship: { value: "", isValid: true },
  };

  const initialDataBeneficiary: IBeneficiary = {
    id: "",
    rut: "",
    birthDate: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    relationship: "",
  };

  const { ui } = useUI();
  const { product } = useProduct();
  // const { beneficiary, getByRut } = useBeneficiary();
  const { lead, getLeadById, createLead, leadIsLoading } = useLead();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isButtonAddEnabled, setIsButtonAddEnabled] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [beneficiaryForm, setBeneficiaryForm] = useState<IBeneficiaryForm>({
    rut: { value: "", isValid: true },
    ...initialDataForm,
  });
  const [beneficiaries, setBeneficiaries] = useState<IBeneficiary[]>([]);
  const [position, setPosition] = useState<number>(0);

  const isValidEmail = (email: string) => {
    return emailRegEx.test(email) || email === "";
  };

  const isValidPhone = (phone: string) => {
    return phone.length === 9;
  };

  const fillForm = (data: any) => {
    const {
      rut,
      birthDate,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
      relationship,
    } = data;

    setBeneficiaryForm({
      rut: { value: rut || "", isValid: isValidRut(unFormatRut(rut)) },
      birthDate: { value: birthDate || "", isValid: true },
      name: { value: name || "", isValid: true },
      paternalLastName: {
        value: paternalLastName || "",
        isValid: true,
      },
      maternalLastName: {
        value: maternalLastName || "",
        isValid: true,
      },
      address: { value: address || "", isValid: true },
      district: { value: district || "", isValid: true },
      email: {
        value: email || "",
        isValid: isValidEmail(email),
      },
      phone: {
        value: phone || "",
        isValid: isValidPhone(phone),
      },
      relationship: {
        value: relationship || "",
        isValid: true,
      },
    });
  };

  const editBeneficiary = (item: any, idx: number) => {
    setPosition(idx + 1);
    fillForm(item);
    setShowModal(true);
  };

  const deleteBeneficiary = (rut: string) => {
    setBeneficiaries([...beneficiaries.filter((item) => item.rut !== rut)]);
  };

  const addBeneficiary = () => {
    if (position === 0) {
      setBeneficiaries([
        ...beneficiaries,
        {
          id: "",
          rut: beneficiaryForm.rut.value,
          birthDate: beneficiaryForm.birthDate.value,
          name: beneficiaryForm.name.value,
          paternalLastName: beneficiaryForm.paternalLastName.value,
          maternalLastName: beneficiaryForm.maternalLastName.value,
          address: beneficiaryForm.address.value,
          district: beneficiaryForm.district.value,
          email: beneficiaryForm.email.value,
          phone: beneficiaryForm.phone.value,
          relationship: beneficiaryForm.relationship.value,
        },
      ]);
    }

    if (position > 0) {
      const items = [...beneficiaries];
      items[position - 1] = {
        id: "",
        rut: beneficiaryForm.rut.value,
        birthDate: beneficiaryForm.birthDate.value,
        name: beneficiaryForm.name.value,
        paternalLastName: beneficiaryForm.paternalLastName.value,
        maternalLastName: beneficiaryForm.maternalLastName.value,
        address: beneficiaryForm.address.value,
        district: beneficiaryForm.district.value,
        email: beneficiaryForm.email.value,
        phone: beneficiaryForm.phone.value,
        relationship: beneficiaryForm.relationship.value,
      };
      setBeneficiaries(items);
    }
    setShowModal(false);
  };

  const handleCloseClick = () => {
    setShowModal(false);
  };

  const handleClickNewBeneficiary = () => {
    setPosition(0);
    setBeneficiaryForm({
      rut: { value: "", isValid: true },
      ...initialDataForm,
    });
    setShowModal(true);
  };

  const handleClickSave = () => {
    router.push(`/payment?productPlanId=${ui.product.productPlan_id}`);
    // createLead({
    //   ...lead,
    //   insured: lead.insured ? [{ ...lead.insured[0], beneficiaries }] : [],
    //   subscription: false,
    //   send: false,
    // });
  };

  useEffect(() => {
    getLeadById(lead.id);
  }, []);

  useEffect(() => {
    const isValid =
      beneficiaryForm.rut.value !== "" &&
      beneficiaryForm.rut.isValid &&
      beneficiaryForm.birthDate.value !== "" &&
      beneficiaryForm.birthDate.isValid &&
      beneficiaryForm.name.value !== "" &&
      beneficiaryForm.name.isValid &&
      beneficiaryForm.paternalLastName.value !== "" &&
      beneficiaryForm.paternalLastName.isValid &&
      beneficiaryForm.maternalLastName.value !== "" &&
      beneficiaryForm.maternalLastName.isValid &&
      beneficiaryForm.address.value !== "" &&
      beneficiaryForm.address.isValid &&
      beneficiaryForm.district.value !== "" &&
      beneficiaryForm.district.isValid &&
      beneficiaryForm.email.value !== "" &&
      beneficiaryForm.email.isValid &&
      beneficiaryForm.phone.value !== "" &&
      beneficiaryForm.phone.isValid &&
      beneficiaryForm.relationship.value !== "" &&
      beneficiaryForm.relationship.isValid;

    setIsButtonAddEnabled(isValid);
  }, [beneficiaryForm]);

  // useEffect(() => {
  //   if (beneficiary) {
  //     fillForm(beneficiary);
  //   }
  // }, [beneficiary]);

  useEffect(() => {
    setIsButtonEnabled(beneficiaries.length > 0);
  }, [beneficiaries.length]);

  useEffect(() => {
    if (
      lead.insured &&
      lead.insured.length > 0 &&
      lead.insured[0].beneficiaries &&
      lead.insured[0].beneficiaries.length > 0
    ) {
      setBeneficiaries(lead.insured[0].beneficiaries);
    }
  }, [lead.insured]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const { slug, plan } = router.query;
  //     router.push(`/${slug}/payment/${plan}?leadId=${lead.id}`);
  //   }
  // }, [isSuccess]);

  return (
    <>
      <Content>
        <Col>
          <Table>
            <TableHeader>
              <TableCell width="70px" align="center">{`#`}</TableCell>
              <TableCell width="120px">Rut</TableCell>
              <TableCell width="300px">Nombre Completo</TableCell>
              <TableCell width="110px">Nacimiento</TableCell>
              <TableCell width="150px">Parentesco</TableCell>
              <TableCell width="60px">&nbsp;</TableCell>
              <TableCellEnd />
            </TableHeader>
            <TableDetail>
              {beneficiaries.length > 0 &&
                beneficiaries.map((itemBeneficiary, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="70px" align="center">
                      {idx + 1}
                    </TableCell>
                    <TableCell width="120px" align="right">
                      {itemBeneficiary.rut}
                    </TableCell>
                    <TableCell width="300px">{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                    <TableCell width="110px" align="center">
                      {dbDateToText(itemBeneficiary.birthDate)}
                    </TableCell>
                    <TableCell width="150px">
                      {itemBeneficiary.relationship}
                    </TableCell>
                    <TableCell width="60px" align="center">
                      <TableIcons>
                        <Icon
                          iconName="edit"
                          onClick={() => editBeneficiary(itemBeneficiary, idx)}
                        />
                        <Icon
                          iconName="delete"
                          onClick={() => deleteBeneficiary(itemBeneficiary.rut)}
                        />
                      </TableIcons>
                    </TableCell>
                  </TableRow>
                ))}
            </TableDetail>
          </Table>
          <Row align="space-between">
            <Summary color={beneficiaries.length > 0 ? "blue" : "#959595"}>
              {beneficiaries.length === 0
                ? "No tiene cargas asociadas"
                : beneficiaries.length === 1
                ? "1 carga"
                : `${beneficiaries.length} cargas`}
            </Summary>
            <ButtonIcon
              iconName="add"
              color="gray"
              onClick={handleClickNewBeneficiary}
            />
          </Row>
        </Col>
        <ModalWindow
          showModal={showModal}
          setClosed={handleCloseClick}
          title={`Beneficiario`}>
          <Col gap="20px">
            <BeneficiaryForm
              getByRut={() => {}} //getByRut
              initialDataForm={initialDataForm}
              formData={beneficiaryForm}
              setFormData={setBeneficiaryForm}
            />
            <Row align="center">
              <Button
                text="Registrar"
                width="150px"
                onClick={addBeneficiary}
                enabled={isButtonAddEnabled}
              />
            </Row>
          </Col>
        </ModalWindow>
      </Content>
      <Footer>
        <Button
          text="Registrar"
          width="200px"
          onClick={handleClickSave}
          // enabled={isButtonEnabled}
        />
      </Footer>
      {leadIsLoading && <Loading />}
    </>
  );
};

export default Beneficiary;
