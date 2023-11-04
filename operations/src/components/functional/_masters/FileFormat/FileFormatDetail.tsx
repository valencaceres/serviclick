import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";
import { Section } from "../../../ui/Section";
import InputText from "../../../ui/InputText";

import { FileFormatProducts, FileFormatFields } from ".";

import { unFormatRut, formatRut } from "../../../../utils/rut";
import { rutRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useRetail, useField } from "../../../../hooks";
import { resetFileFormat } from "~/redux/slices/fileFormatSlice";

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
  const router = useRouter();

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

  const { getRetailByRut, retail, resetRetail } = useRetail();
  const { resetField } = useField();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<ICustomerForm>(initialDataForm);
  const [product, setProduct] = useState<any>(null);

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
    getRetailByRut(event.target.value);
    setIsProcessing(true);
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
    resetRetail();
    resetFileFormat();
    setProduct(null);
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id && id !== "new") {
        getRetailByRut(id.toString());
        setIsProcessing(true);
      }
    }
  }, [router]);

  useEffect(() => {
    resetRetail();
    resetField();
    setFormData(initialDataForm);
  }, []);

  useEffect(() => {
    console.log(retail);
    if (retail.id && isProcessing) {
      setFormData({
        rut: { value: retail.rut, isValid: true },
        companyName: { value: retail.name, isValid: true },
        legalRepresentative: {
          value: retail.legalRepresentative,
          isValid: true,
        },
        line: { value: retail.line, isValid: true },
        address: { value: retail.address, isValid: true },
        district: { value: retail.district, isValid: true },
        email: { value: retail.email, isValid: true },
        phone: { value: retail.phone, isValid: true },
      });
      setIsProcessing(false);
    }
  }, [retail.id, isProcessing]);

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
            <Section title="Productos" width="375px" />
            <FileFormatProducts
              products={retail.products}
              setProduct={setProduct}
            />
          </ContentCell>
        </ContentRow>
        <ContentCell gap="5px">
          <Section title="Campos" width="720px" />
          <InputText
            label="Producto"
            width="720px"
            value={product?.name || ""}
            disabled={true}
          />
          <FileFormatFields />
        </ContentCell>
      </ContentCell>
    </Fragment>
  );
};

export default FileFormatDetail;
