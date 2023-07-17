import { useState, useEffect, Fragment } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";
import { Section } from "../../../ui/Section";
import InputText from "../../../ui/InputText";

import { FileFormatSubscriptions, FileFormatFields } from ".";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useContractor } from "../../../../hooks";

export interface IFieldFormString {
  value: string;
  isValid: boolean;
}

interface ICustomerForm {
  rut: IFieldFormString;
  companyName: IFieldFormString;
  legalRepresentative: IFieldFormString;
  line: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
}

const FileFormatDetail = () => {
  const initialDataForm = {
    rut: { value: "", isValid: true },
    companyName: { value: "", isValid: true },
    legalRepresentative: { value: "", isValid: true },
    line: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const { getContractorByRut, getContractorById, contractor } = useContractor();

  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState<ICustomerForm>(initialDataForm);

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const handleBlurRut = (event: any) => {
    event.target.value = formatRut(event.target.value);
    setFormData({
      ...formData,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
    getContractorByRut(event.target.value, "C");
    setSearch(false);
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setFormData({
      ...initialDataForm,
      rut: {
        value: event.target.value,
        isValid: isValidRut(event.target.value),
      },
    });
  };

  useEffect(() => {
    if (contractor.id) {
      setFormData({
        rut: { value: contractor.rut, isValid: true },
        companyName: { value: contractor.companyName, isValid: true },
        legalRepresentative: {
          value: contractor.legalRepresentative,
          isValid: true,
        },
        line: { value: contractor.line, isValid: true },
        address: { value: contractor.address, isValid: true },
        district: { value: contractor.district, isValid: true },
        email: { value: contractor.email, isValid: true },
        phone: { value: contractor.phone, isValid: true },
      });
      getContractorById(contractor.id);
    }
  }, [contractor.id]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px">
          <ContentCell gap="5px" width="340px">
            <Section title="Datos del Contratante" width="340px" />
            <ContentCell gap="5px" width="340px">
              <ContentRow align="space-between">
                <InputText
                  label="Rut"
                  width="150px"
                  value={formData?.rut.value}
                  onChange={handleChangeRut}
                  onBlur={handleBlurRut}
                  onFocus={handleFocusRut}
                  isValid={formData?.rut.isValid}
                />
              </ContentRow>
              <InputText
                label="Razón Social"
                value={formData?.companyName.value}
                disabled={true}
                width="340px"
              />
              <InputText
                label="Representante Legal"
                value={formData?.legalRepresentative.value}
                disabled={true}
              />
              <InputText
                label="Giro"
                value={formData?.line.value}
                disabled={true}
              />
              <InputText
                label="Dirección"
                value={formData?.address.value}
                disabled={true}
              />
              <InputText
                label="Comuna"
                value={formData?.district.value}
                disabled={true}
              />
              <InputText
                label="Correo electrónico"
                value={formData?.email.value}
                disabled={true}
              />
              <InputText
                width="150px"
                label="Teléfono"
                value={formData?.phone.value}
                disabled={true}
              />
            </ContentCell>
          </ContentCell>
          <ContentCell gap="5px">
            <Section title="Suscripciones" width="375px" />
            <FileFormatSubscriptions contractor={contractor} />
          </ContentCell>
        </ContentRow>
        <ContentCell gap="5px">
          <Section title="Campos" width="720px" />
          <FileFormatFields />
        </ContentCell>
      </ContentCell>
    </Fragment>
  );
};

export default FileFormatDetail;
