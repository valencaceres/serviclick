import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";

import { PlusIcon } from "lucide-react";
import { Label } from "../../ui/Label";
import { Button } from "../../ui/ButtonShadcn";
import { Input } from "../../ui/Input";
import ComboBox from "../../../components/ui/ComboBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/Dialog";
import { ScrollArea } from "../../ui/ScrollArea";

import { emailRegEx, numberRegEx, rutRegEx } from "../../../utils/regEx";
import { rutValidate } from "../../../utils/validations";
import { formatRut, unFormatRut } from "../../../utils/format";

import { useQueryBeneficiary, useQueryLead } from "../../../hooks/query";
import {
  useRelationship,
  useDistrict,
  useInsured,
  useBeneficiary,
} from "../../../zustand/hooks";

const AddBeneficiary = ({
  insured,
  edit,
  beneficiaryToEdit,
  setIsEdit,
  setIsOpen,
  subscription_id,
  isOpen,
  maxBeneficiaries,
  beneficiaries,
}: any) => {
  const { insuredProfile } = useInsured();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {beneficiaries.length < maxBeneficiaries && (
        <DialogTrigger disabled={beneficiaries.length > maxBeneficiaries}>
          <Button
            className="border-4 border-[#b4cd25] "
            onClick={() => {
              setIsEdit(false);
              setIsOpen(true);
            }}
            disabled={beneficiaries.length > maxBeneficiaries}
          >
            Agregar beneficiarios (maximo de {maxBeneficiaries} beneficiarios)
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-white h-[600px] lg:h-[700px]  ">
        <ScrollArea className="px-4">
          <DialogHeader>
            <DialogTitle>
              {edit === true ? "Editar Beneficiario" : "Agregar Beneficiario"}
            </DialogTitle>
            <DialogDescription>
              {edit
                ? "Completa los datos para editar al beneficiario."
                : "Completa los datos para agregar un beneficiario."}
            </DialogDescription>
          </DialogHeader>
          <NewBeneficiaryForm
            beneficiaryToEdit={beneficiaryToEdit}
            edit={edit}
            insured={insured}
            setIsOpen={setIsOpen}
            subscription_id={subscription_id}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const NewBeneficiaryForm = ({
  insured,
  edit,
  beneficiaryToEdit,
  setIsOpen,
  subscription_id,
}: any) => {
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
    paternalLastName: string;
    maternalLastName: string;
    birthDate: string;
    address: string;
    district: string;
    email: string;
    phone: string;
    relationship: string;
  }>({
    mode: "onBlur",
  });

  const rut = watch("rut");
  const name = watch("name");
  const paternalLastName = watch("paternalLastName");
  const maternalLastName = watch("maternalLastName");
  const birthDate = watch("birthDate");
  const address = watch("address");
  const district = watch("district");
  const email = watch("email");
  const phone = watch("phone");
  const relationship = watch("relationship");

  const { districtList } = useDistrict();
  const { setBeneficiaryList, beneficiaryList } = useInsured();
  const { mutate: addBeneficiary } = useQueryLead().useAddBeneficiary();
  const { data: person } = useQueryBeneficiary().useGetByRut(rut);
  const { relationshipList } = useRelationship();
  const { upsertBeneficiary, beneficiaryLoading } = useBeneficiary();
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

  const send = async (data: any) => {
    if (edit === false) {
      try {
        addBeneficiary(
          {
            insured_id: insured?.id,
            subscription_id: subscription_id,
            beneficiary_data: {
              rut,
              name,
              paternalLastName,
              maternalLastName,
              birthDate,
              address,
              district,
              email,
              phone,
              relationship,
            },
          },
          {
            onSuccess: (e: any) => {
              setIsOpen(false);

              setBeneficiaryList([
                ...beneficiaryList,
                {
                  id: e?.beneficiary_id,

                  rut,
                  name,
                  paternallastname: paternalLastName,
                  maternallastname: maternalLastName,
                  birthdate: birthDate,
                  address,
                  district,
                  email,
                  phone,
                  relationship,
                },
              ]);
              reset();
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (edit === true) {
      upsertBeneficiary({
        id: beneficiaryToEdit?.id,
        rut,
        name,
        paternalLastName,
        maternalLastName,
        birthDate,
        address,
        district,
        email,
        phone,
        relationship,
      });
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (person) {
      setValue("name", person.name);
      setValue("paternalLastName", person.paternalLastName);
      setValue("maternalLastName", person.maternalLastName);
      setValue("birthDate", person.birthDate);
      setValue("address", person.address);
      setValue("district", person.district);
      setValue("email", person.email);
      setValue("phone", person.phone);
    }
  }, [person]);

  useEffect(() => {
    if (edit && beneficiaryToEdit) {
      setValue("rut", beneficiaryToEdit.rut);
      setValue("name", beneficiaryToEdit.name);
      setValue("paternalLastName", beneficiaryToEdit.paternalLastName);
      setValue("maternalLastName", beneficiaryToEdit.maternalLastName);
      setValue("birthDate", beneficiaryToEdit.birthDate);
      setValue("address", beneficiaryToEdit.address);
      setValue("district", beneficiaryToEdit.district);
      setValue("email", beneficiaryToEdit.email);
      setValue("phone", beneficiaryToEdit.phone);
      setValue("relationship", beneficiaryToEdit.relationship);
    }
  }, [edit, beneficiaryToEdit]);

  return (
    <form onSubmit={handleSubmit(send)} className="flex flex-col gap-2 py-2">
      <div className="flex w-full flex-col">
        <Label htmlFor="Rut" className="text-xs text-dusty-gray">
          Rut
        </Label>
        <Input
          disabled={edit}
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
          className={`w-full ${
            errors.maternalLastName?.message?.length ? "border-red-500" : ""
          }`}
          value={maternalLastName}
        />
      </div>
      <div className="flex w-full flex-col">
        <Label htmlFor="birthDate" className="text-xs text-dusty-gray">
          Fecha de Nacimiento
        </Label>
        <Input
          errorText={errors.birthDate?.message}
          {...register("birthDate", {
            required: "Este campo es requerido",
          })}
          type="date"
          id="birthDate"
          placeholder="Fecha de Nacimiento"
          className={`w-full ${
            errors.birthDate?.message?.length ? "border-red-500" : ""
          }`}
          value={birthDate}
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
          placeholder="Teléfono"
          maxLength={9}
          className={`w-full ${
            errors?.phone?.message?.length ? "border-red-500" : ""
          }`}
          value={phone}
        />
      </div>
      <div className="flex w-full flex-col">
        <Label htmlFor="email" className="text-xs text-dusty-gray">
          Parentesco
        </Label>
        <ComboBox
          label="Parentesco"
          width="100%"
          value={relationship}
          onChange={(e: any) => {
            setValue("relationship", e.target.value);
          }}
          placeHolder="Seleccione parentesco"
          data={relationshipList}
          dataValue="name"
          dataText="name"
        />
      </div>

      <DialogFooter>
        {beneficiaryLoading ? (
          <span>Cargando...</span>
        ) : (
          <Button disabled={beneficiaryLoading}>
            {edit ? "Editar" : "Agregar"}
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};

/*   const DeleteBeneficiary = ({
    beneficiary,
    open,
    onOpenChange,
    insured_id,
    subscription_id,
  }: any) => {
    const { removeLeadBeneficiary, beneficiaryLoading } = useBeneficiary();
    const [confirmBeneficiaryName, setConfirmBeneficiaryName] =
      useState<string>("");
  
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              ¿Estás absolutamente seguro/a?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-500">
              Esta acción no se puede deshacer. Esta eliminará el beneficiario de
              la suscripcion permanentemente.
            </AlertDialogDescription>
            <div className="py-2">
              <Label htmlFor="field-name" className="text-red-500">
                Escribe {""}
                <span className="font-bold">{`"${
                  beneficiary?.name ?? ""
                }"`}</span>{" "}
                para confirmar
              </Label>
              <Input
                id="field-name"
                placeholder="Nombre del beneficiario"
                value={confirmBeneficiaryName}
                onChange={(e) => setConfirmBeneficiaryName(e.target.value)}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="button"
              disabled={confirmBeneficiaryName !== beneficiary?.name}
              onClick={() => {
                removeLeadBeneficiary(
                  insured_id,
                  beneficiary?.id,
                  subscription_id
                );
              }}
              className="bg-red-500 font-bold text-white hover:bg-red-600 focus:bg-red-500 active:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
 */
export default AddBeneficiary;
