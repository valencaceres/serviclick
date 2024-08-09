import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import EntityInsured from "../../Entity/Insured";

import { Screen, Content, Footer } from "../../../layout/Form";

import Button from "../../../ui/Button/Button";
import Loading from "../../../ui/Loading";

import { unFormatRut } from "../../../../utils/format";
import { rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { IFieldFormString } from "../../../../interfaces/form";

import {
  useSlug,
  useProduct,
  useInsured,
  useLead,
} from "../../../../hooks/store";

interface IInsured {
  id: string;
  rut: string;
  birthDate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

interface IEntityInsuredForm {
  rut: IFieldFormString;
  birthDate: IFieldFormString;
  name: IFieldFormString;
  paternalLastName: IFieldFormString;
  maternalLastName: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
}

const Insured = () => {
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
  };

  const initialDataInsured: IInsured = {
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
  };

  const { slug } = useSlug();
  const { product } = useProduct();
  const { getByRut, insured } = useInsured();
  const { isSuccess, isLoading, lead, create } = useLead();

  const [insuredData, setInsured] = useState<IInsured>(initialDataInsured);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [entityInsuredForm, setEntityInsuredForm] =
    useState<IEntityInsuredForm>({
      rut: { value: "", isValid: true },
      ...initialDataForm,
    });

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

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
    } = data;

    setEntityInsuredForm({
      rut: { value: rut || "", isValid: isValidRut(rut) },
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
    });
  };

  const handleClickSave = () => {
    create({
      ...lead,
      insured:
        lead.insured && lead.insured.length > 0
          ? [
              {
                ...lead.insured[0],
                id: insuredData.id,
                rut: insuredData.rut,
                name: insuredData.name,
                paternalLastName: insuredData.paternalLastName,
                maternalLastName: insuredData.maternalLastName,
                birthDate: insuredData.birthDate,
                address: insuredData.address,
                district: insuredData.district,
                email: insuredData.email,
                phone: insuredData.phone,
              },
            ]
          : [
              {
                id: insuredData.id,
                rut: insuredData.rut,
                name: insuredData.name,
                paternalLastName: insuredData.paternalLastName,
                maternalLastName: insuredData.maternalLastName,
                birthDate: insuredData.birthDate,
                address: insuredData.address,
                district: insuredData.district,
                email: insuredData.email,
                phone: insuredData.phone,
                values: [],
                beneficiaries: [],
              },
            ],
      subscription: false,
      send: false,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const { slug, plan } = router.query;
      router.push(
        `/${slug}/${
          product.values.length > 0
            ? "product"
            : product.beneficiaries > 0
            ? "beneficiaries"
            : "payment"
        }/${plan}?leadId=${lead.id}`
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      lead &&
      lead.insured &&
      lead.insured.length > 0 &&
      lead.insured[0].rut !== ""
    ) {
      fillForm(lead.insured[0]);
    }
  }, [lead]);

  useEffect(() => {
    if (insured && insured.rut !== "") {
      fillForm(insured);
    }
  }, [insured]);

  useEffect(() => {
    const isValid =
      entityInsuredForm.rut.value !== "" &&
      entityInsuredForm.rut.isValid &&
      entityInsuredForm.name.value !== "" &&
      entityInsuredForm.name.isValid &&
      entityInsuredForm.paternalLastName.value !== "" &&
      entityInsuredForm.paternalLastName.isValid &&
      entityInsuredForm.maternalLastName.value !== "" &&
      entityInsuredForm.maternalLastName.isValid &&
      entityInsuredForm.address.value !== "" &&
      entityInsuredForm.address.isValid &&
      entityInsuredForm.district.value !== "" &&
      entityInsuredForm.district.isValid &&
      entityInsuredForm.email.value !== "" &&
      entityInsuredForm.email.isValid &&
      entityInsuredForm.phone.value !== "" &&
      entityInsuredForm.phone.isValid;

    setIsButtonEnabled(isValid);

    if (isValid) {
      setInsured({
        id: "",
        rut: entityInsuredForm.rut.value,
        birthDate: entityInsuredForm.birthDate.value,
        name: entityInsuredForm.name.value,
        paternalLastName: entityInsuredForm.paternalLastName.value,
        maternalLastName: entityInsuredForm.maternalLastName.value,
        address: entityInsuredForm.address.value,
        district: entityInsuredForm.district.value,
        email: entityInsuredForm.email.value,
        phone: entityInsuredForm.phone.value,
      });
    }
  }, [entityInsuredForm]);

  return (
    <Screen>
      <Content>
        <EntityInsured
          getByRut={getByRut}
          initialDataForm={initialDataForm}
          formData={entityInsuredForm}
          setFormData={setEntityInsuredForm}
        />
      </Content>
      <Footer>
        <Button
          text="Registrar"
          width="200px"
          onClick={handleClickSave}
          enabled={isButtonEnabled}
        />
      </Footer>
      {isLoading && <Loading />}
    </Screen>
  );
};

export default Insured;
