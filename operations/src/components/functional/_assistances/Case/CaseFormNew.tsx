import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";
import { LoadingMessage } from "../../../ui/LoadingMessage";
import Button from "../../../ui/Button";
import InputText from "../../../ui/InputText";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useCase } from "../../../../store/hooks/useCase";
import useQueryCase from "../../../../hooks/query/useQueryCase";
import useQueryStage from "../../../../hooks/query/useQueryStage";
import { useUser } from "../../../../hooks";

const CaseFormNew = () => {
  const router = useRouter();
  const { getBeneficiaryByRut, data, beneficiaryIsLoading } = useCase();
  const beneficiary = data.beneficiary;
  const initialFormData = {
    rut: { value: "", isValid: true },
    birthDate: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSearching, setIsSearching] = useState(false);
  const [isNewBeneficiary, setIsNewBeneficiary] = useState(false);
  const [stage, setStage] = useState("");

  const { data: stageData } = useQueryStage().useGetAll();
  const { mutate } = useQueryCase().useCreate();

  const handleClickNext = () => {
    mutate({
      applicant: {
        type: isNewBeneficiary ? "C" : beneficiary.type || "C",
        id: isNewBeneficiary ? null : beneficiary.id,
        name: formData.name.value,
        paternalLastName: formData.paternalLastName.value,
        maternalLastName: formData.maternalLastName.value,
        birthDate: formData.birthDate.value,
        address: formData.address.value,
        district: formData.district.value,
        email: formData.email.value,
        phone: formData.phone.value,
      },
      number: 1,
      stage_id: stage,
      user_id: "0a53d2b2-574d-4a64-995b-56fe056a7b5c",
    });
  };

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const handleBlurRut = (event: any) => {
    if (
      event.target.value !== "" &&
      rutValidate(unFormatRut(event.target.value))
    ) {
      event.target.value = formatRut(event.target.value);
      setIsSearching(true);
      setFormData({
        ...formData,
        rut: {
          value: event.target.value,
          isValid: isValidRut(event.target.value),
        },
      });
      getBeneficiaryByRut(event.target.value);
    }
  };

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const refreshFormData = () => {
    setFormData({
      rut: { value: data.beneficiary.rut, isValid: true },
      birthDate: { value: data.beneficiary.birthdate, isValid: true },
      name: { value: data.beneficiary.name, isValid: true },
      paternalLastName: {
        value: data.beneficiary.paternallastname,
        isValid: true,
      },
      maternalLastName: {
        value: data.beneficiary.maternallastname,
        isValid: true,
      },
      address: { value: data.beneficiary.address, isValid: true },
      district: { value: data.beneficiary.district, isValid: true },
      email: { value: data.beneficiary.email, isValid: true },
      phone: { value: data.beneficiary.phone, isValid: true },
    });
  };

  useEffect(() => {
    if (isSearching === true && beneficiaryIsLoading === false) {
      if (beneficiary.rut !== "") {
        setIsSearching(false);
        setIsNewBeneficiary(false);
        setStage(stageData.find((s: any) => s.name === "Apertura")?.id || "");
        return refreshFormData();
      }
      setIsSearching(false);
      setIsNewBeneficiary(true);
      setStage(stageData.find((s: any) => s.name === "Contención")?.id || "");
      return setFormData({
        rut: { value: formData.rut.value, isValid: true },
        birthDate: { value: "", isValid: true },
        name: { value: "", isValid: true },
        paternalLastName: { value: "", isValid: true },
        maternalLastName: { value: "", isValid: true },
        address: { value: "", isValid: true },
        district: { value: "", isValid: true },
        email: { value: "", isValid: true },
        phone: { value: "", isValid: true },
      });
    }
  }, [isSearching, beneficiaryIsLoading]);

  return (
    <div>
      <ContentCell gap="20px">
        <ContentRow gap="5px">
          <InputText
            label="N° Caso"
            value={"1"}
            type="text"
            disabled={true}
            onChange={() => {}}
            width="260px"
          />
          <InputText
            label="Fecha/hora de apertura"
            value={"2021-01-01 12:00:00"}
            type="text"
            disabled={true}
            onChange={() => {}}
            width="260px"
          />
        </ContentRow>
        {isNewBeneficiary ? (
          <ContentCell gap="2px">
            <h2 className="font-semibold text-red-500">Contención</h2>
            <p className="text-sm text-secondary-500">
              El beneficiario no existe, por favor ingrese los datos
            </p>
          </ContentCell>
        ) : null}

        <ContentCell gap="5px">
          <ContentRow gap="5px">
            <InputText
              label="Rut"
              width={"260px"}
              onFocus={handleFocusRut}
              onBlur={handleBlurRut}
              maxLength={9}
              value={formData?.rut.value}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  rut: {
                    value: e.target.value,
                    isValid: isValidRut(e.target.value),
                  },
                });
              }}
              isValid={formData?.rut.isValid}
            />
            <InputText
              label="Fecha de nacimiento"
              value={formData?.birthDate.value}
              type="date"
              maxLength={10}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  birthDate: { value: e.target.value, isValid: true },
                });
              }}
              width="260px"
            />
          </ContentRow>
          <InputText
            label="Nombres"
            value={formData.name.value}
            type="text"
            onChange={(e: any) => {
              setFormData({
                ...formData,
                name: { value: e.target.value, isValid: true },
              });
            }}
            width="525px"
          />
          <ContentRow gap="5px">
            <InputText
              label="Apellido paterno"
              value={formData.paternalLastName.value}
              type="text"
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  paternalLastName: { value: e.target.value, isValid: true },
                });
              }}
              width="260px"
            />
            <InputText
              label="Apellido materno"
              value={formData.maternalLastName.value}
              type="text"
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  maternalLastName: { value: e.target.value, isValid: true },
                });
              }}
              width="260px"
            />
          </ContentRow>
          <InputText
            label="Dirección"
            value={formData.address.value}
            type="text"
            onChange={(e: any) => {
              setFormData({
                ...formData,
                address: { value: e.target.value, isValid: true },
              });
            }}
            width="525px"
          />
          <InputText
            label="Comuna"
            value={formData.district.value}
            type="text"
            onChange={(e: any) => {
              setFormData({
                ...formData,
                district: { value: e.target.value, isValid: true },
              });
            }}
            width="525px"
          />
          <ContentRow gap="5px">
            <InputText
              label="Correo electrónico"
              value={formData.email.value}
              type="email"
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  email: {
                    value: e.target.value,
                    isValid:
                      emailRegEx.test(e.target.value) || e.target.value === "",
                  },
                });
              }}
              width="260px"
              isValid={formData?.email.isValid}
            />
            <InputText
              label="Teléfono"
              value={formData.phone.value}
              type="text"
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  phone: {
                    value: e.target.value,
                    isValid: e.target.value.length === 9,
                  },
                });
              }}
              width="260px"
              isValid={formData?.phone.isValid}
            />
          </ContentRow>
        </ContentCell>
        <Button text="Continuar" type="button" onClick={handleClickNext} />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormNew;
