import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import { unFormatRut } from "@/utils/format";
import { emailRegEx } from "@/utils/regEx";
import { isValidRut } from "@/utils/validations";
import { dbDateToText } from "@/utils/date";

import { Content, Footer, Col, Row, Body } from "@/components/layout/Generic";
import { Card, CardContent, CardFooter } from "@/components/ui/card-ui";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-ui";
import BeneficiaryForm from "./BeneficiaryForm";

import { TableIcons } from "@/components/ui/Table";
import Icon from "@/components/ui/Icon";
import { Button } from "@/components/ui/button-ui";
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
  const {
    beneficiary,
    getBeneficiaryByRut,
    beneficiaryList: beneficiaries,
    setBeneficiaryList: setBeneficiaries,
  } = useBeneficiary();
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
      <Card className="mt-4 mb-4">
        <CardContent className="py-4">
          <Col>
            {isDesktop ? (
              <div className="min-h-[500px]">
                <Table>
                  <TableHeader>
                    <TableCell
                      className="text-center border-r border-b border-white h-12 bg-gray-200  text-gray-600 font-bold"
                      width="70px"
                      align="center"
                    >{`#`}</TableCell>
                    <TableCell
                      className="text-center border  border-white h-12 bg-gray-200  text-gray-600 font-bold"
                      width="120px"
                    >
                      Rut
                    </TableCell>
                    <TableCell
                      className="text-center border  border-white h-12 bg-gray-200  text-gray-600 font-bold"
                      width="300px"
                    >
                      Nombre Completo
                    </TableCell>
                    <TableCell
                      className="text-center border  border-white h-12 bg-gray-200  text-gray-600 font-bold"
                      width="110px"
                    >
                      Nacimiento
                    </TableCell>
                    <TableCell
                      className="text-center border  border-white h-12 bg-gray-200  text-gray-600 font-bold"
                      width="150px"
                    >
                      Parentesco
                    </TableCell>
                    <TableCell
                      className="text-center border-l border-b border-white h-12 bg-gray-200  text-gray-600 font-bold"
                      width="60px"
                    >
                      &nbsp;
                    </TableCell>
                  </TableHeader>
                  <TableBody>
                    {beneficiaries.length > 0 &&
                      beneficiaries.map((itemBeneficiary, idx: number) => (
                        <TableRow
                          key={idx}
                          className={
                            idx % 2 === 0
                              ? "bg-sky-100 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                              : "bg-slate-100 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                          }
                        >
                          <TableCell
                            width="70px"
                            className="border border-white h-12"
                            align="center"
                          >
                            {idx + 1}
                          </TableCell>
                          <TableCell
                            className="border border-white h-12"
                            width="120px"
                            align="right"
                          >
                            {itemBeneficiary.rut}
                          </TableCell>
                          <TableCell
                            className="border border-white h-12"
                            width="300px"
                          >{`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}</TableCell>
                          <TableCell
                            className="border border-white h-12"
                            width="110px"
                            align="center"
                          >
                            {dbDateToText(itemBeneficiary.birthDate)}
                          </TableCell>
                          <TableCell
                            className="border border-white h-12"
                            width="150px"
                          >
                            {itemBeneficiary.relationship}
                          </TableCell>
                          <TableCell
                            className="border border-white h-12"
                            width="60px"
                            align="center"
                          >
                            <TableIcons>
                              <div className="flex flex-row gap-3 ">
                                <Icon
                                  className="cursor-pointer"
                                  iconName="edit"
                                  onClick={() =>
                                    editBeneficiary(itemBeneficiary, idx)
                                  }
                                />
                                <Icon
                                  className="text-red-500 cursor-pointer"
                                  iconName="delete"
                                  onClick={() =>
                                    deleteBeneficiary(itemBeneficiary.rut)
                                  }
                                />
                              </div>
                            </TableIcons>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableCell
                    className="text-center border border-gray-400 h-12 bg-gray-200 text-black font-bold"
                    width="320px"
                  >
                    Nombre Completo
                  </TableCell>
                </TableHeader>
                <TableBody>
                  {beneficiaries.length > 0 &&
                    beneficiaries.map((itemBeneficiary, idx: number) => (
                      <TableRow
                        key={idx}
                        className={
                          idx % 2 === 0
                            ? "bg-sky-100 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                            : "bg-slate-100 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-600 hover:font-bold"
                        }
                      >
                        <TableCell
                          className="border border-white h-12"
                          width="320px"
                        >
                          {`${itemBeneficiary.name} ${itemBeneficiary.paternalLastName} ${itemBeneficiary.maternalLastName}`}
                          <TableIcons>
                            <div className="flex flex-row gap-3 ">
                              <Icon
                                className="cursor-pointer"
                                iconName="edit"
                                onClick={() =>
                                  editBeneficiary(itemBeneficiary, idx)
                                }
                              />
                              <Icon
                                className="text-red-500 cursor-pointer"
                                iconName="delete"
                                onClick={() =>
                                  deleteBeneficiary(itemBeneficiary.rut)
                                }
                              />
                            </div>
                          </TableIcons>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
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
                    className={`text-white w-full ${
                      isButtonAddEnabled ? "bg-[#03495C]" : "bg-gray-400"
                    } ${
                      !isButtonAddEnabled && "cursor-not-allowed"
                    }  active:bg-opacity-80`}
                    onClick={addBeneficiary}
                    disabled={!isButtonAddEnabled}
                  >
                    Registrar
                  </Button>
                </Row>
              </Col>
            </ModalWindow>
          )}
        </CardContent>
        <CardFooter className="justify-center flex">
          {" "}
          <Button
            className={`text-white w-1/2 bg-[#03495C]`}
            onClick={handleClickSave}
          >
            Registrar
          </Button>{" "}
        </CardFooter>
      </Card>

      {leadIsLoading && <Loading />}
    </Body>
  );
};

export default Beneficiary;
