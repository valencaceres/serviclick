import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import { unFormatRut } from "@/utils/format";
import { emailRegEx } from "@/utils/regEx";
import { isValidRut } from "@/utils/validations";
import { dbDateToText } from "@/utils/date";

import { Content, Footer, Col, Row, Body } from "@/components/layout/Generic";

import BeneficiaryForm from "./BeneficiaryForm";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableIcons,
  TableRow,
} from "@/components/ui/Table";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import ModalWindow from "@/components/ui/ModalWindow";
import Loading from "@/components/ui/Loading";
import Summary from "@/components/ui/Summary";

import {
  useUI,
  useRelationship,
  useProduct,
  useBeneficiary,
  useLead,
} from "@/store/hooks";

import { IFieldFormString } from "@/interfaces/form";
import { IBeneficiary } from "@/interfaces/beneficiary";

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

  const isDesktop = useMediaQuery({ minWidth: 1200 });

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
  const { product, setProduct } = useProduct();
  const { beneficiary, getBeneficiaryByRut,beneficiaryList:beneficiaries , setBeneficiaryList:setBeneficiaries} = useBeneficiary();
  const { lead, getLeadById, createLead, leadIsLoading } = useLead();
  const { getAllRelationships } = useRelationship();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isButtonAddEnabled, setIsButtonAddEnabled] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [beneficiaryForm, setBeneficiaryForm] = useState<IBeneficiaryForm>({
    rut: { value: "", isValid: true },
    ...initialDataForm,
  });
  const [position, setPosition] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

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
          address: lead.insured[0].address,
          district: lead.insured[0].district,
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
        address: lead.insured[0].address,
        district: lead.insured[0].district,
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
    if (lead && lead.insured && lead.insured.length > 0) {
      setIsProcessing(true);
      createLead({
        ...lead,
        insured: lead.insured ? [{ ...lead.insured[0], beneficiaries }] : [],
        subscription: false,
        send: false,
      });
    }
  };

  useEffect(() => {
    getLeadById(lead.id);
    getAllRelationships();
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
      // beneficiaryForm.address.value !== "" &&
      // beneficiaryForm.address.isValid &&
      // beneficiaryForm.district.value !== "" &&
      // beneficiaryForm.district.isValid &&
      beneficiaryForm.email.value !== "" &&
      beneficiaryForm.email.isValid &&
      beneficiaryForm.phone.value !== "" &&
      beneficiaryForm.phone.isValid &&
      beneficiaryForm.relationship.value !== "" &&
      beneficiaryForm.relationship.isValid;

    setIsButtonAddEnabled(isValid);
  }, [beneficiaryForm]);

 useEffect(() => {
   if (beneficiary) {
       fillForm(beneficiary);
     }
   }, [beneficiary]);

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

  useEffect(() => {
    if (lead.id !== "" && leadIsLoading === false && isProcessing === true) {
      router.push(
        `/payment?productPlanId=${ui.product.productPlan_id}&leadId=${lead.id}`
      );
      setIsProcessing(false);
    }
  }, [lead.id, leadIsLoading, isProcessing]);

  return (
    <Body>
      <Content>
        <Col>
          {isDesktop ? (
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
                            onClick={() =>
                              editBeneficiary(itemBeneficiary, idx)
                            }
                          />
                          <Icon
                            iconName="delete"
                            onClick={() =>
                              deleteBeneficiary(itemBeneficiary.rut)
                            }
                          />
                        </TableIcons>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableDetail>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableCell width="320px">Nombre Completo</TableCell>
                <TableCellEnd />
              </TableHeader>
              <TableDetail>
                {beneficiaries.length > 0 &&
                  beneficiaries.map((itemBeneficiary, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell width="320px">
                        {`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}
                        <TableIcons>
                          <Icon
                            iconName="edit"
                            onClick={() =>
                              editBeneficiary(itemBeneficiary, idx)
                            }
                          />
                          <Icon
                            iconName="delete"
                            onClick={() =>
                              deleteBeneficiary(itemBeneficiary.rut)
                            }
                          />
                        </TableIcons>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableDetail>
            </Table>
          )}
          <Row align="space-between" width="100%">
            <Summary color={beneficiaries.length > 0 ? "blue" : "#959595"}>
              {beneficiaries.length === 0
                ? `No tiene cargas asociadas (max ${product.beneficiaries})`
                : beneficiaries.length === 1
                ? `1 carga  (max ${product.beneficiaries})`
                : `${beneficiaries.length} cargas (max ${product.beneficiaries})`}
            </Summary>
            <ButtonIcon
              iconName="add"
              color="gray"
              disabled={beneficiaries.length >= product.beneficiaries}
              onClick={handleClickNewBeneficiary}
            />
          </Row>
        </Col>
        {beneficiaries.length < product.beneficiaries && (
          <ModalWindow
            showModal={showModal}
            setClosed={handleCloseClick}
            title={`Beneficiario`}
          >
            <Col gap="20px">
              {product?.plan?.beneficiary_price > 0 && (
                <h2 style={{ textAlign: "center", color: "#fca5a5" }}>
                  Cada carga tiene un costo de $
                  {product?.plan?.beneficiary_price ?? 0}
                </h2>
              )}

              <BeneficiaryForm
                getByRut={getBeneficiaryByRut} //getByRut
                initialDataForm={initialDataForm}
                formData={beneficiaryForm}
                setFormData={setBeneficiaryForm}
              />
              <Row align="center" width="100%">
                <Button
                  text="Registrar"
                  width="150px"
                  onClick={addBeneficiary}
                  enabled={isButtonAddEnabled}
                />
              </Row>
            </Col>
          </ModalWindow>
        )}
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
    </Body>
  );
};

export default Beneficiary;
