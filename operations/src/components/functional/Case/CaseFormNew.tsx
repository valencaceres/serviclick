import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import { Button } from "~/components/ui/ButtonC";
import InputText from "../../ui/InputText";
import { Label } from "~/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/RadioGroup";

import { unFormatRut, formatRut } from "../../../utils/format";
import { rutRegEx, emailRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";

import {
  useQueryCase,
  useQueryStage,
  useQueryContractor,
} from "../../../hooks/query";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/Input";
import { getDateTime } from "~/utils/dateAndTime";

const CaseFormNew = ({ thisCase }: any) => {
  const [isNewBeneficiary, setIsNewBeneficiary] = useState<boolean>(false);
  const [isInsured, setIsInsured] = useState<string>();

  return (
    <div>
      <BeneficiaryForm
        thisCase={thisCase}
        isNewBeneficiary={isNewBeneficiary}
        setIsNewBeneficiary={setIsNewBeneficiary}
      />
      {isNewBeneficiary && (
        <>
          <RadioGroup
            value={isInsured}
            onValueChange={setIsInsured}
            className="flex w-full items-center gap-2 py-4"
            defaultValue=""
          >
            <Label
              className={`w-full cursor-pointer rounded-md bg-dusty-gray-50 px-4 py-2 text-center text-lg  ${
                isInsured === "isInsured"
                  ? "bg-teal-blue text-dusty-gray-50"
                  : "text-dusty-gray-800 hover:bg-dusty-gray-100"
              }`}
              htmlFor="isInsured"
            >
              <RadioGroupItem
                className="hidden"
                id="isInsured"
                value="isInsured"
              />
              Titular
            </Label>
            <Label
              className={`w-full cursor-pointer rounded-md bg-dusty-gray-50 px-4 py-2 text-center text-lg ${
                isInsured === "isBeneficiary"
                  ? "bg-teal-blue text-dusty-gray-50"
                  : "text-dusty-gray-800 hover:bg-dusty-gray-100"
              }`}
              htmlFor="isBeneficiary"
            >
              <RadioGroupItem
                className="hidden"
                id="isBeneficiary"
                value="isBeneficiary"
              />
              Carga
            </Label>
          </RadioGroup>
          {isInsured === "isInsured" ? (
            <ClientSelect />
          ) : isInsured === "isBeneficiary" ? (
            <>
              <p>formulario</p>
              <ClientSelect />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default CaseFormNew;

const BeneficiaryForm = ({
  thisCase,
  isNewBeneficiary,
  setIsNewBeneficiary,
}: any) => {
  const router = useRouter();

  const {
    reset,
    register,
    getValues,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{
    rut: string;
    birthdate: string;
    name: string;
    paternalLastName: string;
    maternalLastName: string;
    address: string;
    district: string;
    email: string;
    phone: string;
  }>({
    mode: "onBlur",
  });

  const rut = watch("rut");
  const birthdate = watch("birthdate");
  const name = watch("name");
  const paternalLastName = watch("paternalLastName");
  const maternalLastName = watch("maternalLastName");
  const address = watch("address");
  const district = watch("district");
  const email = watch("email");
  const phone = watch("phone");

  const [stage, setStage] = useState("");
  const [dateTime, setDateTime] = useState("");

  const { user } = useUser();
  const { data: stageData } = useQueryStage().useGetAll();
  const { mutate: createCase } = useQueryCase().useCreate();
  const { data: newCaseNumber } = useQueryCase().useGetNewCaseNumber();

  const { data, isLoading } = useQueryCase().useGetBeneficiaryByRut(rut);

  const isValidRut = (rut: string) => {
    if (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    ) {
      clearErrors("rut");
      return true;
    } else {
      setError("rut", {
        type: "manual",
        message: "Rut inválido",
      });
      return false;
    }
  };

  const isValidEmail = (email: string) => {
    if (emailRegEx.test(email) || email === "") {
      clearErrors("email");
      return true;
    } else {
      setError("email", {
        type: "manual",
        message: "Email inválido",
      });
      return false;
    }
  };

  const isValidPhone = (phone: string) => {
    if (phone.length === 9 || phone === "") {
      clearErrors("phone");
      return true;
    } else {
      setError("phone", {
        type: "manual",
        message: "Teléfono inválido",
      });
      return false;
    }
  };

  const send = async () => {
    createCase(
      {
        applicant: {
          type: isNewBeneficiary ? "C" : data?.beneficiary.type,
          id: isNewBeneficiary ? null : data?.beneficiary.id,
          rut: getValues("rut"),
          name: getValues("name"),
          paternalLastName: getValues("paternalLastName"),
          maternalLastName: getValues("maternalLastName"),
          birthDate: getValues("birthdate"),
          address: getValues("address"),
          district: getValues("district"),
          email: getValues("email"),
          phone: getValues("phone"),
        },
        number: thisCase !== null ? thisCase?.case_number : newCaseNumber,
        stage_id: stage,
        user_id: user?.id,
      },
      {
        onSuccess: (response) => {
          router.push(`/case/${response.data.id}/registro de servicio`);
        },
      }
    );
  };

  useEffect(() => {
    if (data?.beneficiary) {
      setIsNewBeneficiary(false);
      setValue(
        "birthdate",
        new Date(data?.beneficiary.birthdate)?.toISOString().split("T")[0]
      );
      setValue("name", data?.beneficiary.name);
      setValue("paternalLastName", data?.beneficiary.paternallastname);
      setValue("maternalLastName", data?.beneficiary.maternallastname);
      setValue("address", data?.beneficiary.address);
      setValue("district", data?.beneficiary.district);
      setValue("email", data?.beneficiary.email);
      setValue("phone", data?.beneficiary.phone);
      return setStage(
        stageData?.find((s: any) => s.name === "Apertura")?.id || ""
      );
    } else if (!data?.beneficiary && rut?.length === 12) {
      setIsNewBeneficiary(true);
      setValue("birthdate", "");
      setValue("name", "");
      setValue("paternalLastName", "");
      setValue("maternalLastName", "");
      setValue("address", "");
      setValue("district", "");
      setValue("email", "");
      setValue("phone", "");

      return setStage(
        stageData?.find((s: any) => s.name === "Contención")?.id || ""
      );
    }
  }, [data, isLoading, thisCase]);

  useEffect(() => {
    if (router.pathname === "/case/new") {
      setIsNewBeneficiary(false);
      reset();
    }
  }, [router]);

  useEffect(() => {
    setDateTime(getDateTime());
  });

  return (
    <div>
      <ContentCell gap="20px">
        <ContentRow gap="5px">
          <InputText
            label="N° Caso"
            value={
              router.pathname === "/case/new"
                ? newCaseNumber
                : thisCase?.case_number
            }
            type="text"
            disabled={true}
            width="260px"
          />
          <InputText
            label="Fecha/hora de apertura"
            value={dateTime}
            type="text"
            disabled={true}
            width="260px"
          />
        </ContentRow>
        {isNewBeneficiary && rut?.length === 12 ? (
          <ContentCell gap="2px">
            <h2 className="font-semibold text-red-500">Contención</h2>
            <p className="text-sm text-secondary-500">
              El beneficiario no existe, por favor ingrese los datos
            </p>
          </ContentCell>
        ) : null}
        <form onSubmit={handleSubmit(send)}>
          <ContentCell gap="5px">
            <div className="flex gap-2">
              <div className="flex w-full flex-col">
                <Label htmlFor="Rut" className="text-xs text-dusty-gray">
                  Rut
                </Label>
                <Input
                  errorText={errors.rut?.message}
                  {...register("rut", {
                    required: "Este campo es requerido",
                    onChange: (event) => {
                      isValidRut(event.target.value);
                    },
                    onBlur: (event) => {
                      setValue("rut", formatRut(event.target.value));
                    },
                  })}
                  onFocus={(event) => {
                    setValue("rut", unFormatRut(event.target.value));
                  }}
                  type="text"
                  id="Rut"
                  placeholder="Rut"
                  maxLength={9}
                  disabled={
                    isLoading || thisCase?.is_active || !thisCase === true
                      ? false
                      : true
                  }
                  className={`w-full ${errors.rut ? "border-red-500" : ""}`}
                  value={thisCase !== null ? thisCase?.rut : rut}
                />
              </div>
              <div className="flex w-full flex-col">
                <Label htmlFor="birthDate" className="text-xs text-dusty-gray">
                  Fecha de nacimiento
                </Label>
                <Input
                  errorText={errors.birthdate?.message}
                  {...register("birthdate", {
                    required: "Este campo es requerido",
                  })}
                  type="date"
                  id="birthDate"
                  placeholder="Fecha de nacimiento"
                  disabled={
                    isLoading || thisCase?.is_active || !thisCase === true
                      ? false
                      : true
                  }
                  className={`w-full ${
                    errors.birthdate?.message?.length ? "border-red-500" : ""
                  }`}
                  value={
                    thisCase !== null
                      ? thisCase?.birthdate?.split("T")[0]
                      : birthdate
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name" className="text-xs text-dusty-gray">
                Nombres
              </Label>
              <Input
                errorText={errors.name?.message}
                {...register("name", {
                  required: "Este campo es requerido",
                })}
                type="text"
                id="name"
                placeholder="Nombres"
                disabled={
                  isLoading || thisCase?.is_active || !thisCase === true
                    ? false
                    : true
                }
                className={`w-full ${
                  errors.name?.message?.length ? "border-red-500" : ""
                }`}
                value={thisCase !== null ? thisCase?.name : name}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex w-full flex-col">
                <Label
                  htmlFor="paternalLastName"
                  className="text-xs text-dusty-gray"
                >
                  Apellido paterno
                </Label>
                <Input
                  errorText={errors.paternalLastName?.message}
                  {...register("paternalLastName", {
                    required: "Este campo es requerido",
                  })}
                  type="text"
                  id="paternalLastName"
                  placeholder="Apellido paterno"
                  disabled={
                    isLoading || thisCase?.is_active || !thisCase === true
                      ? false
                      : true
                  }
                  className={`w-full ${
                    errors.paternalLastName?.message?.length
                      ? "border-red-500"
                      : ""
                  }`}
                  value={
                    thisCase !== null
                      ? thisCase?.paternal_last_name
                      : paternalLastName
                  }
                />
              </div>
              <div className="flex w-full flex-col">
                <Label
                  htmlFor="maternalLastName"
                  className="text-xs text-dusty-gray"
                >
                  Apellido materno
                </Label>
                <Input
                  errorText={errors.maternalLastName?.message}
                  {...register("maternalLastName", {
                    required: "Este campo es requerido",
                  })}
                  type="text"
                  id="maternalLastName"
                  placeholder="Apellido materno"
                  disabled={
                    isLoading || thisCase?.is_active || !thisCase === true
                      ? false
                      : true
                  }
                  className={`w-full ${
                    errors.maternalLastName?.message?.length
                      ? "border-red-500"
                      : ""
                  }`}
                  value={
                    thisCase !== null
                      ? thisCase?.maternal_last_name
                      : maternalLastName
                  }
                />
              </div>
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="email" className="text-xs text-dusty-gray">
                Dirección
              </Label>
              <Input
                errorText={errors.address?.message}
                {...register("address", {
                  required: "Este campo es requerido",
                })}
                type="text"
                id="address"
                placeholder="Dirección"
                disabled={
                  isLoading || thisCase?.is_active || !thisCase === true
                    ? false
                    : true
                }
                className={`w-full ${
                  errors.address?.message?.length ? "border-red-500" : ""
                }`}
                value={thisCase !== null ? thisCase?.address : address}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="email" className="text-xs text-dusty-gray">
                Comuna
              </Label>
              <Input
                errorText={errors.district?.message}
                {...register("district", {
                  required: "Este campo es requerido",
                })}
                type="text"
                id="district"
                placeholder="Comuna"
                disabled={
                  isLoading || thisCase?.is_active || !thisCase === true
                    ? false
                    : true
                }
                className={`w-full ${
                  errors.district?.message?.length ? "border-red-500" : ""
                }`}
                value={thisCase !== null ? thisCase?.district : district}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex w-full flex-col">
                <Label htmlFor="email" className="text-xs text-dusty-gray">
                  Correo electrónico
                </Label>
                <Input
                  errorText={errors.email?.message}
                  {...register("email", {
                    required: "Este campo es requerido",
                    pattern: emailRegEx,
                    onChange: (e: any) => {
                      isValidEmail(e.target.value);
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="Correo electrónico"
                  disabled={
                    isLoading || thisCase?.is_active || !thisCase === true
                      ? false
                      : true
                  }
                  className={`w-full ${
                    errors.email?.message?.length ? "border-red-500" : ""
                  }`}
                  value={thisCase !== null ? thisCase?.email : email}
                />
              </div>
              <div className="flex w-full flex-col">
                <Label htmlFor="phone" className="text-xs text-dusty-gray">
                  Teléfono
                </Label>
                <Input
                  errorText={errors.phone?.message}
                  {...register("phone", {
                    required: "Este campo es requerido",
                    onChange: (e: any) => {
                      isValidPhone(e.target.value);
                    },
                  })}
                  type="text"
                  id="phone"
                  placeholder="Teléfono"
                  disabled={
                    isLoading || thisCase?.is_active || !thisCase === true
                      ? false
                      : true
                  }
                  maxLength={9}
                  className={`w-full ${
                    errors?.phone?.message?.length ? "border-red-500" : ""
                  }`}
                  value={thisCase !== null ? thisCase?.phone : phone}
                />
              </div>
            </div>
          </ContentCell>
          {!isNewBeneficiary ? (
            <Button className="my-6 w-full">Continuar</Button>
          ) : null}
        </form>
      </ContentCell>

      <LoadingMessage />
    </div>
  );
};

const ClientSelect = () => {
  const { data } = useQueryContractor().useGetAll({
    contractorType: "P",
    active: true,
  });

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Seleccione un cliente" />
      </SelectTrigger>
      <SelectContent className="h-64 bg-white">
        <SelectGroup>
          <SelectLabel>Clientes</SelectLabel>
          {data?.map((client: any) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
