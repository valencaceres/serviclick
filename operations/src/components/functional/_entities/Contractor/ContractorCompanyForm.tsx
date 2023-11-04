import { useRouter } from "next/router";

import ComboBox from "../../../ui/ComboBox";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { unFormatRut, formatRut } from "../../../../utils/rut";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict } from "../../../../hooks";

import styles from "./Contractor.module.scss";
import { Button } from "~/components/ui/ButtonC";
import { useQueryContractor } from "~/hooks/query";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { useEffect } from "react";
import ButtonIcon from "~/components/ui/ButtonIcon";
import { useQueryClient } from "@tanstack/react-query";

const ContractorCompanyForm = ({
  contractor,
  isEditing,
  setIsEditing,
}: any) => {
  const { pathname, push } = useRouter();
  const queryClient = useQueryClient();

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
    name: string;
    legalRepresentative: string;
    line: string;
    address: string;
    district: string;
    email: string;
    phone: string;
  }>({
    mode: "onBlur",
  });

  const rut = watch("rut");
  const name = watch("name");
  const legalRepresentative = watch("legalRepresentative");
  const line = watch("line");
  const address = watch("address");
  const district = watch("district");
  const email = watch("email");
  const phone = watch("phone");

  const { list: districtList } = useDistrict();

  const { mutate: createCompany } = useQueryContractor().useCreate();
  const { data: contractorData } = useQueryContractor().useGetByRut(rut, "C");

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
    if (numberRegEx.test(phone) || phone === "") {
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

  const send = () => {
    const data = {
      rut,
      name,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
      type: "C",
    };

    createCompany(data, {
      onSuccess: (data) => {
        if (!pathname.includes("/new")) {
          setIsEditing(false);
          reset();
        }
        queryClient.invalidateQueries(["contractor", data.data?.id]);
        push(`/entities/contractor/${data.data?.id}`);
      },
    });
  };

  useEffect(() => {
    if (contractor?.type !== "") {
      setValue("rut", contractor?.rut);
      setValue("name", contractor?.name);
      setValue("legalRepresentative", contractor?.legalRepresentative);
      setValue("line", contractor?.line);
      setValue("address", contractor?.address);
      setValue("district", contractor?.district);
      setValue("email", contractor?.email);
      setValue("phone", contractor?.phone);
    }
    if (contractorData) {
      setValue("rut", contractorData?.rut);
      setValue("name", contractorData?.name);
      setValue("legalRepresentative", contractorData?.legalRepresentative);
      setValue("line", contractorData?.line);
      setValue("address", contractorData?.address);
      setValue("district", contractorData?.district);
      setValue("email", contractorData?.email);
      setValue("phone", contractorData?.phone);
    }
  }, [contractor, contractorData, setValue]);

  return (
    <form onSubmit={handleSubmit(send)}>
      <ContentCell gap="5px" className={styles.contentCell}>
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
            placeholder="Rut"
            id="Rut"
            disabled={!pathname.includes("/new") && !isEditing}
            maxLength={9}
            className={`w-full ${errors.rut ? "border-red-500" : ""}`}
            value={rut || ""}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="name" className="text-xs text-dusty-gray">
            Razón Social
          </Label>
          <Input
            errorText={errors.name?.message}
            {...register("name", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="name"
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Razón Social"
            className={`w-full ${
              errors.name?.message?.length ? "border-red-500" : ""
            }`}
            value={name}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label
            htmlFor="legalRepresentative"
            className="text-xs text-dusty-gray"
          >
            Representante Legal
          </Label>
          <Input
            errorText={errors.legalRepresentative?.message}
            {...register("legalRepresentative", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="legalRepresentative"
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Representante Legal"
            className={`w-full ${
              errors.legalRepresentative?.message?.length
                ? "border-red-500"
                : ""
            }`}
            value={legalRepresentative}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="line" className="text-xs text-dusty-gray">
            Giro
          </Label>
          <Input
            errorText={errors.line?.message}
            {...register("line", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="line"
            placeholder="Giro"
            disabled={!pathname.includes("/new") && !isEditing}
            className={`w-full ${
              errors.line?.message?.length ? "border-red-500" : ""
            }`}
            value={line}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="address" className="text-xs text-dusty-gray">
            Dirección
          </Label>
          <Input
            errorText={errors.address?.message}
            {...register("address", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="address"
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Dirección"
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
          <ComboBox
            label="Comuna"
            width="100%"
            value={district}
            onChange={(e: any) => {
              setValue("district", e.target.value);
            }}
            placeHolder="Seleccione comuna"
            data={districtList}
            dataValue="district_name"
            dataText="district_name"
            enabled={pathname.includes("/new") || isEditing}
          />
        </div>
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
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Correo electrónico"
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
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Teléfono"
            maxLength={9}
            className={`w-full ${
              errors?.phone?.message?.length ? "border-red-500" : ""
            }`}
            value={phone}
          />
        </div>
        {pathname === "/entities/contractor/new/company" && (
          <Button>Crear</Button>
        )}
        {isEditing && (
          <ContentRow gap="5px">
            <Button className="w-[305px] rounded-full">Guardar</Button>{" "}
            <ButtonIcon
              iconName="edit"
              color={"gray"}
              onClick={() => setIsEditing(!isEditing)}
            />
          </ContentRow>
        )}
      </ContentCell>
    </form>
  );
};

export default ContractorCompanyForm;
