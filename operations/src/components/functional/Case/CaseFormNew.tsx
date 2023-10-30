import React, { Dispatch, useEffect, useRef, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { clerkClient, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";

import { ContentCell, ContentRow } from "../../layout/Content";

import { LoadingMessage } from "~/components/ui/LoadingMessage";
import InputText from "~/components/ui/InputText";
import { Label } from "~/components/ui/Label";
import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";
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
import { Input } from "~/components/ui/Input";
import ComboBox from "~/components/ui/ComboBox";
import CheckBox from "~/components/ui/CheckBox";

import { unFormatRut, formatRut, rutValidate } from "~/utils/rut";
import { rutRegEx, emailRegEx } from "~/utils/regEx";
import { getDateTime } from "~/utils/dateAndTime";

import { useApplicant } from "~/store/hooks";
import { useUI } from "~/hooks";
import {
  useQueryCase,
  useQueryStage,
  useQueryContractor,
} from "../../../hooks/query";
import { useDistrict } from "~/hooks";
import { useCase } from "~/store/hooks";

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

const CaseFormNew = () => {
  return (
    <div>
      <BeneficiaryForm />
    </div>
  );
};

export default CaseFormNew;

const BeneficiaryForm = () => {
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
  const [prevRut, setPrevRut] = useState<string>("");

  const [role, setRole] = useState("");
  const prevDataRef = useRef();
  const { list: districtList } = useDistrict();
  const { data: newCaseNumber } = useQueryCase().useGetNewCaseNumber();
  const { getApplicantByRut, isLoading, caseValue, getById } = useCase();
  const { user } = useUser();
  const { upsert: upsertApplicant } = useApplicant();

  const { setTitleUI, filters } = useUI();
  const isAdmin = user?.publicMetadata?.roles?.operaciones === "admin";

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
  const handleGetApplicantData = () => {
    getApplicantByRut(formatRut(rut ?? ""));
  };
  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue("rut", newValue);
    isValidRut(newValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const formattedRut = formatRut(event.target.value);
    setValue("rut", formattedRut);
    handleGetApplicantData();
  };

  const next = () => {
    void router.push("/case/registro de servicio");
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

  let isBeneficiary: boolean;

  if (role !== "I") {
    isBeneficiary = true;
  } else {
    isBeneficiary = false;
  }

  const send = async () => {
    try {
      const response = await upsertApplicant(
        caseValue.type,
        caseValue.type === "I" ? caseValue.insured : caseValue.beneficiary
      );

      if (response !== undefined) {
        const route =
          role === "C"
            ? `/assistance/case/insured`
            : `/assistance/case/product`;
        router.push(route);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  const setInitialValues = (newData: any) => {
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

    if (rut === newData.insured?.rut) {
      const insuredBirthdate = newData.insured?.birthdate;
      let birthdateValue = null;

      if (insuredBirthdate) {
        const dateObject = parseISO(insuredBirthdate);

        if (!isNaN(dateObject.getTime())) {
          // La fecha es válida, formatearla
          birthdateValue = format(dateObject, "yyyy-MM-dd");
        } else {
          console.error("Fecha no válida");
        }
      }
      setRole(newData?.type);
      setIsInsured("isInsured");
      initialValues = {
        rut: newData.insured?.rut,
        birthdate: birthdateValue ?? "",
        name: newData.insured?.name,
        paternalLastName: newData.insured?.paternallastname,
        maternalLastName: newData.insured?.maternallastname,
        address: newData.insured?.address,
        district: newData.insured?.district,
        email: newData.insured?.email,
        phone: newData.insured?.phone,
      };
    } else if (rut === newData.beneficiary?.rut) {
      const beneficiaryBirthdate = newData.beneficiary?.birthdate;
      let birthdateValue = null;
      setRole(newData?.type);

      if (beneficiaryBirthdate) {
        const dateObject = parseISO(beneficiaryBirthdate);

        if (!isNaN(dateObject.getTime())) {
          birthdateValue = format(dateObject, "yyyy-MM-dd");
        } else {
          console.error("Fecha no válida");
        }
      }
      setIsInsured("isBeneficiary");
      initialValues = {
        rut: newData.beneficiary?.rut,
        birthdate: birthdateValue ?? "",
        name: newData.beneficiary?.name,
        paternalLastName: newData.beneficiary?.paternallastname,
        maternalLastName: newData.beneficiary?.maternallastname,
        address: newData.beneficiary?.address,
        district: newData.beneficiary?.district,
        email: newData.beneficiary?.email,
        phone: newData.beneficiary?.phone,
      };
    }

    Object.entries(initialValues).forEach(([key, value]) =>
      setValue(
        key as keyof IInitialValues,
        value as IInitialValues[keyof IInitialValues]
      )
    );
  };

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.back();
  };
  const handleClickSave = () => {
    send();
  };

  useEffect(() => {
    getById(router.query.id as string);
    getApplicantByRut(caseValue.insured?.rut ?? "");
  }, []);

  useEffect(() => {
    setDateTime(getDateTime());

    if (router.pathname === "/case/new") {
      setIsNewBeneficiary(false);
      reset();
    }
  }, [router, reset]);

  useEffect(() => {
    if (caseValue) {
      setPrevRut(rut);
      setInitialValues(caseValue);
      setIsNewBeneficiary(false);
    } else if (!caseValue && rut?.length >= 10) {
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
  }, [caseData, rut, prevRut]);

  useEffect(() => {
    if (caseData) {
      if (isInsured === "isInsured") {
        setTitleUI("Caso - datos del titular");
      } else if (isInsured === "isBeneficiary") {
        setTitleUI("Caso - datos del beneficiario (carga)");
      } else if (isNewBeneficiary) {
        setTitleUI("Caso- datos del beneficiario (contención)");
      }
    }
  }, [caseData, isInsured, isNewBeneficiary]);

  return (
    <>
      <div>
        <ContentCell gap="20px">
          <ContentRow gap="5px">
            <InputText
              label="N° Caso"
              value={router.pathname === "/case/new" ? newCaseNumber : 1}
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

          <form onSubmit={handleSubmit(send)}>
            <ContentCell gap="5px">
              <div className="flex gap-2">
                <div className="flex w-full flex-col">
                  <InputText
                    label="Rut"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                      setValue("rut", unFormatRut(event.target.value));
                    }}
                    value={rut}
                    maxLength={9}
                    className={`w-full ${errors.rut ? "border-red-500" : ""}`}
                    width="260px"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <InputText
                    label="Fecha de nacimiento"
                    type="date"
                    id="birthDate"
                    onFocus={(event: any) => {
                      setValue("rut", unFormatRut(event.target.value));
                    }}
                    onChange={(event: any) => {
                      setValue("birthdate", event.target.value);
                    }}
                    className={`w-full ${
                      errors.birthdate?.message?.length ? "border-red-500" : ""
                    }`}
                    value={birthdate}
                  />
                </div>
              </div>
              <div>
                <InputText
                  label="Nombres"
                  type="text"
                  id="name"
                  onFocus={(event: any) => {
                    setValue("rut", unFormatRut(event.target.value));
                  }}
                  onChange={(event: any) => {
                    setValue("name", event.target.value);
                  }}
                  className={`w-full ${
                    errors.name?.message?.length ? "border-red-500" : ""
                  }`}
                  value={name}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex w-full flex-col">
                  <InputText
                    label="Apellido paterno"
                    type="text"
                    onChange={(event: any) => {
                      setValue("paternalLastName", event.target.value);
                    }}
                    id="paternalLastName"
                    className={`w-full ${
                      errors.paternalLastName?.message?.length
                        ? "border-red-500"
                        : ""
                    }`}
                    value={paternalLastName}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <InputText
                    label="Apellido materno"
                    onChange={(event: any) => {
                      setValue("maternalLastName", event.target.value);
                    }}
                    type="text"
                    id="maternalLastName"
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
                <InputText
                  label="Direccion"
                  type="text"
                  id="address"
                  onChange={(event: any) => {
                    setValue("address", event.target.value);
                  }}
                  className={`w-full ${
                    errors.address?.message?.length ? "border-red-500" : ""
                  }`}
                  value={address}
                />
              </div>
              <div className="flex w-full flex-col">
                <Select
                  value={district}
                  onValueChange={(value) => {
                    setValue("district", value);
                  }}
                >
                  <SelectTrigger className="relative h-10 rounded-sm border-dusty-gray border-opacity-40 py-6">
                    <SelectValue />
                    <Label
                      htmlFor="email"
                      className="absolute left-3 top-0 text-xs text-dusty-gray"
                    >
                      Comuna
                    </Label>
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
              <ContentCell gap="20px">
                <ContentRow gap="5px">
                  <div className="flex w-1/2 flex-col gap-1">
                    <div>
                      <InputText
                        label="Correo electrónico"
                        type="text"
                        id="email"
                        onChange={(event: any) => {
                          setValue("email", event.target.value);
                        }}
                        className={`w-full ${
                          errors.email?.message?.length ? "border-red-500" : ""
                        }`}
                        value={email}
                      />
                    </div>
                    <div>
                      <InputText
                        label="Teléfono"
                        type="text"
                        id="phone"
                        onChange={(event: any) => {
                          setValue("phone", event.target.value);
                        }}
                        maxLength={9}
                        className={`w-full ${
                          errors?.phone?.message?.length ? "border-red-500" : ""
                        }`}
                        value={phone}
                      />
                    </div>
                  </div>
                  <div className="relative h-[100px] w-1/2 border border-gray-300">
                    <p className="absolute left-2 top-1"> Tipo</p>
                    <div className="flex h-full flex-col items-center justify-center text-slate-500">
                      <label className="flex items-center text-slate-500">
                        <input
                          type="radio"
                          name="role"
                          value="I"
                          className="text-slate-500"
                          checked={role === "I"}
                          onChange={handleChangeRole}
                        />
                        <span className="ml-2">Titular</span>
                      </label>
                      <label className="flex items-center text-slate-500">
                        <input
                          type="radio"
                          name="role"
                          value="C"
                          checked={role === "C"}
                          onChange={handleChangeRole}
                          className="text-slate-500"
                        />
                        <span className="ml-2">Carga</span>
                      </label>
                    </div>
                  </div>
                </ContentRow>
              </ContentCell>
            </ContentCell>
          </form>
        </ContentCell>
        <LoadingMessage />
      </div>
      <Fragment>
        <FloatMenu>
          <ButtonIcon iconName="home" onClick={handleClickHome} />
          <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
          <ButtonIcon
            iconName="save"
            onClick={() => {
              handleClickSave();
            }}
          />
        </FloatMenu>
      </Fragment>
    </>
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
