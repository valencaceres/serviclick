import React, { Dispatch, useEffect, useRef, useState } from "react";
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
import { useDistrict } from "~/hooks";
import ComboBox from "~/components/ui/ComboBox";

interface IInitialValues {
  rut: string;
  birthdate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string | undefined;
  email: string;
  phone: string;
}

const CaseFormNew = ({ thisCase }: any) => {
  return (
    <div>
      <BeneficiaryForm thisCase={thisCase} />
    </div>
  );
};

export default CaseFormNew;

const BeneficiaryForm = ({ thisCase }: any) => {
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
    district: string | undefined;
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
  const [isNewBeneficiary, setIsNewBeneficiary] = useState<boolean>(false);
  const [isInsured, setIsInsured] = useState<string>("isInsured");
  const [client, setClient] = useState<any>("");
  const [prevRut, setPrevRut] = useState<string>("");
  const prevDataRef = useRef();
  const { list: districtList } = useDistrict();
  const { user } = useUser();
  const { data: stageData } = useQueryStage().useGetAll();
  const { mutate: createCase } = useQueryCase().useCreate();
  const { data: newCaseNumber } = useQueryCase().useGetNewCaseNumber();

  const { data, isLoading } = useQueryCase().useGetBeneficiaryByRut(rut);
  const { data: retail } = useQueryContractor().useGetByBeneficiaryId(
    data?.insured?.id
  );
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
          type: isNewBeneficiary ? "C" : isInsured === "isInsured" ? "I" : "B",
          id: isNewBeneficiary ? null : data?.insured.id,
          rut,
          name,
          paternalLastName,
          maternalLastName,
          birthDate: birthdate,
          address,
          district,
          email,
          phone,
        },
        retail_id: !client ? data?.retail_id : client,
        customer_id: data?.customer_id,
        isInsured: isInsured === "isInsured",
        beneficiary_id: isNewBeneficiary
          ? null
          : isInsured === "isInsured"
          ? null
          : data?.beneficiary.id,
        number: thisCase !== null ? thisCase?.case_number : newCaseNumber,
        stage_id: stage,
        user_id: user?.id,
        lead_id: thisCase?.lead_id,
        event_date: thisCase?.event_date,
        event_location: thisCase?.event_location,
      },
      {
        onSuccess: (response) => {
          const route =
            isInsured === "isBeneficiary"
              ? `/case/${response.data.id}/datos titular`
              : `/case/${response.data.id}/registro de servicio`;
          router.push(route);
        },
      }
    );
  };

  const setInitialValues = (newData: any, isThisCase: any) => {
    let initialValues: IInitialValues = {
      rut: rut,
      birthdate: "",
      name: "",
      paternalLastName: "",
      maternalLastName: "",
      address: "",
      district: undefined,
      email: "",
      phone: "",
    };

    if (isThisCase) {
      initialValues = {
        rut: newData.rut,
        birthdate: newData.birthdate?.split("T")[0],
        name: newData.applicant_name,
        paternalLastName: newData.applicant_lastname,
        maternalLastName: newData.applicant_maternallastname,
        address: newData.applicant_address,
        district: newData.applicant_district,
        email: newData.applicant_email,
        phone: newData.applicant_phone,
      };
    } else {
      if (rut === newData.insured?.rut) {
        setIsInsured("isInsured");
        initialValues = {
          rut: newData.insured?.rut,
          birthdate: new Date(newData.insured?.birthdate)
            .toISOString()
            .split("T")[0],
          name: newData.insured?.name,
          paternalLastName: newData.insured?.paternallastname,
          maternalLastName: newData.insured?.maternallastname,
          address: newData.insured?.address,
          district: newData.insured?.district,
          email: newData.insured?.email,
          phone: newData.insured?.phone,
        };
      } else if (rut === newData.beneficiary?.rut) {
        setIsInsured("isBeneficiary");
        initialValues = {
          rut: newData.beneficiary?.rut,
          birthdate: new Date(newData.beneficiary?.birthdate)
            .toISOString()
            .split("T")[0],
          name: newData.beneficiary?.name,
          paternalLastName: newData.beneficiary?.paternallastname,
          maternalLastName: newData.beneficiary?.maternallastname,
          address: newData.beneficiary?.address,
          district: newData.beneficiary?.district,
          email: newData.beneficiary?.email,
          phone: newData.beneficiary?.phone,
        };
      }
    }

    Object.entries(initialValues).forEach(([key, value]) =>
      setValue(
        key as keyof IInitialValues,
        value as IInitialValues[keyof IInitialValues]
      )
    );
    setClient(retail?.id);
  };

  useEffect(() => {
    setDateTime(getDateTime());

    if (router.pathname === "/case/new") {
      setIsNewBeneficiary(false);
      reset();
    }
  }, [router]);

  useEffect(() => {
    prevDataRef.current = data;

    if (thisCase) {
      if (thisCase?.type === "C") {
        setIsNewBeneficiary(true);
      } else {
        setIsNewBeneficiary(false);
      }
      if (thisCase?.insured_id && !thisCase?.beneficiary_id) {
        setIsInsured("isInsured");
      } else {
        setIsInsured("isBeneficiary");
      }
      setInitialValues(thisCase, true);
    } else {
      if (data) {
        setPrevRut(rut);
        setInitialValues(data, false);
        setIsNewBeneficiary(false);
      } else if (
        !data &&
        rut?.length >= 10 &&
        (prevDataRef.current !== data || rut !== prevRut)
      ) {
        setIsNewBeneficiary(true);
        setPrevRut(rut);
        reset({
          birthdate: "",
          name: "",
          paternalLastName: "",
          maternalLastName: "",
          address: "",
          district: "",
          email: "",
          phone: "",
        });
      }
    }
  }, [data, thisCase]);

  useEffect(() => {
    if (thisCase) {
      const stageName = thisCase?.stages?.find(
        (s: any) => s.stage === "Contención"
      )
        ? "Contención"
        : "Apertura";
      const stageId = stageData?.find((s: any) => s.name === stageName)?.id;
      setStage(stageId || "");
    } else {
      if (isNewBeneficiary) {
        const stageId = stageData?.find(
          (s: any) => s.name === "Contención"
        )?.id;
        setStage(stageId || "");
      } else if (data?.beneficiary) {
        const stageId = stageData?.find((s: any) => s.name === "Apertura")?.id;
        setStage(stageId || "");
      }
    }
  }, [stageData, thisCase, data, isNewBeneficiary]);

  return (
    <div>
      <ContentCell gap="10px">
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
        {data && isInsured === "isBeneficiary" && (
          <ContentCell gap="2px">
            <ContentRow gap="5px">
              <h2 className="w-[260px] text-xl font-semibold text-secondary-500">
                Datos de carga
              </h2>
              <InputText
                label="Relación"
                value={
                  data?.beneficiary?.relationship || "Sin relación asignada"
                }
                type="text"
                disabled={true}
                width="260px"
              />
            </ContentRow>
          </ContentCell>
        )}
        {data && isInsured === "isInsured" && (
          <ContentCell gap="2px">
            <h2 className="text-xl font-semibold text-secondary-500">
              Datos del titular
            </h2>
          </ContentCell>
        )}
        {isNewBeneficiary ? (
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
                  value={rut}
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
                  value={birthdate}
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
                value={name}
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
                  value={paternalLastName}
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
                  value={maternalLastName}
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
                value={address}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="email" className="text-xs text-dusty-gray">
                Comuna
              </Label>
              <Select
                value={district}
                onValueChange={(value) => {
                  setValue("district", value);
                }}
              >
                <SelectTrigger className="h-10 rounded-sm border-dusty-gray border-opacity-40 py-6">
                  <SelectValue placeholder="Seleccione comuna" />
                </SelectTrigger>
                <SelectContent className="h-52" id="district">
                  {districtList.map((district) => (
                    <SelectItem
                      {...register("district", {
                        required: "Este campo es requerido",
                      })}
                      key={district.district_name}
                      value={district.district_name}
                      className="text-sm"
                    >
                      {district.district_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  value={email}
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
                  value={phone}
                />
              </div>
            </div>
          </ContentCell>
          {isNewBeneficiary && (
            <>
              <RadioGroup
                value={isInsured}
                onValueChange={setIsInsured}
                className="flex w-full items-center gap-2 py-4"
                defaultValue=""
                disabled={thisCase}
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
              {isInsured === "isInsured" && (
                <>
                  <ClientSelect
                    value={client}
                    setValue={setClient}
                    thisCase={thisCase}
                    retailId={retail?.id}
                  />
                  {client && <Button className="mt-4 w-full">Continuar</Button>}
                </>
              )}
              {isInsured === "isBeneficiary" && (
                <Button className="mt-4 w-full">Continuar</Button>
              )}
            </>
          )}
          {!isNewBeneficiary ? (
            <Button
              className="my-6 w-full"
              disabled={
                isSubmitting || thisCase?.is_active || !thisCase ? false : true
              }
            >
              {isSubmitting ? "Enviando..." : "Continuar"}
            </Button>
          ) : null}
          {!isNewBeneficiary && isInsured === "isInsured" && client && (
            <>
              <ClientSelect
                value={client}
                setValue={setClient}
                thisCase={thisCase}
                retailId={retail?.id}
              />
            </>
          )}
        </form>
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

const ClientSelect = ({
  value,
  setValue,
  thisCase,
  retailId,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  thisCase: any;
  retailId: string;
}) => {
  const { data } = useQueryContractor().useGetAll({
    contractorType: "C",
    active: true,
  });
  return (
    <Select
      value={value}
      onValueChange={setValue}
      defaultValue=""
      disabled={thisCase || (value != "" && value === retailId)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Seleccione un cliente" />
      </SelectTrigger>
      <SelectContent className="max-h-64 bg-white">
        <SelectGroup>
          <SelectItem value="" className="text-gray-500">
            Seleccione un cliente
          </SelectItem>
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
