import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import { Button } from "~/components/ui/ButtonC";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useDistrict } from "../../../../hooks";

import styles from "./Contractor.module.scss";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { useQueryContractor } from "~/hooks/query";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ButtonIcon from "~/components/ui/ButtonIcon";

const ContractorPersonForm = ({ contractor, isEditing, setIsEditing }: any) => {
  const { pathname, push } = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    rut: string;
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
  const name = watch("name");
  const paternalLastName = watch("paternalLastName");
  const maternalLastName = watch("maternalLastName");
  const address = watch("address");
  const district = watch("district");
  const email = watch("email");
  const phone = watch("phone");

  const { list: districtList } = useDistrict();

  const { mutate: createPerson } = useQueryContractor().useCreate();

  const { data: contractorData } = useQueryContractor().useGetByRut(rut, "P");

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
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
      type: "P",
    };

    createPerson(data, {
      onSuccess: (data) => {
        setIsEditing(false);
        queryClient.invalidateQueries(["contractor", data.data?.rut, "P"]);
        push(`/entities/contractor/${data.data?.id}`);
      },
    });
  };

  useEffect(() => {
    if (contractor?.type !== "") {
      setValue("rut", contractor?.rut);
      setValue("name", contractor?.name);
      setValue("paternalLastName", contractor?.paternalLastName);
      setValue("maternalLastName", contractor?.maternalLastName);
      setValue("address", contractor?.address);
      setValue("district", contractor?.district);
      setValue("email", contractor?.email);
      setValue("phone", contractor?.phone);
    }
    if (contractorData) {
      setValue("rut", contractorData?.rut);
      setValue("name", contractorData?.name);
      setValue("paternalLastName", contractorData?.paternalLastName);
      setValue("maternalLastName", contractorData?.maternalLastName);
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
            Nombre
          </Label>
          <Input
            errorText={errors.name?.message}
            {...register("name", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="name"
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Nombre"
            className={`w-full ${
              errors.name?.message?.length ? "border-red-500" : ""
            }`}
            value={name}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="paternalLastName" className="text-xs text-dusty-gray">
            Apellido Paterno
          </Label>
          <Input
            errorText={errors.paternalLastName?.message}
            {...register("paternalLastName", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="paternalLastName"
            disabled={!pathname.includes("/new") && !isEditing}
            placeholder="Apellido Paterno"
            className={`w-full ${
              errors.paternalLastName?.message?.length ? "border-red-500" : ""
            }`}
            value={paternalLastName}
          />
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="maternalLastName" className="text-xs text-dusty-gray">
            Apellido Materno
          </Label>
          <Input
            errorText={errors.maternalLastName?.message}
            {...register("maternalLastName", {
              required: "Este campo es requerido",
            })}
            type="text"
            id="maternalLastName"
            placeholder="Apellido Materno"
            disabled={!pathname.includes("/new") && !isEditing}
            className={`w-full ${
              errors.maternalLastName?.message?.length ? "border-red-500" : ""
            }`}
            value={maternalLastName}
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
        {pathname === "/entities/contractor/new/person" && (
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

export default ContractorPersonForm;
