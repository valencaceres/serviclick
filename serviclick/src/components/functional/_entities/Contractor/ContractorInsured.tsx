import { Fragment, useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import InputText from "../../../ui/InputText/InputText";
import ComboBox from "../../../ui/ComboBox";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";

import { dbDateToText } from "../../../../utils/date";

import { useContractor, useDistrict } from "../../../../hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/ButtonC";

import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { formatRut, unFormatRut } from "~/utils/rut";
import { emailRegEx, numberRegEx, rutRegEx } from "~/utils/regEx";
import { rutValidate } from "~/utils/validations";
import { useQueryInsured, useQueryLead } from "~/hooks/query";
import { IContractorData } from "~/interfaces/customer";
import { LoadingMessage } from "~/components/ui/LoadingMessage";
import { useCustomer } from "~/store/hooks";

const ContractorInsured: React.FC<{ contractor: IContractorData }> = ({
  contractor,
}) => {
  const { subscriptionItem, getSubscriptionById } = useContractor();
  const [isUploading, setIsUploading] = useState(false);

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const { product, selectProduct } = useCustomer();

  const handleChangeProduct = (e: any) => {
    const existingProduct = contractor.origins.find(
      (item: any) => item?.product?.id === e.target.value
    );
    if (existingProduct) {
      selectProduct(existingProduct);
    }
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px">
          <ComboBox
            label="Nombre del producto"
            width="425px"
            value={product.product.id}
            onChange={handleChangeProduct}
            data={contractor?.origins}
            dataValue="product.id"
            dataText="product.name"
          />
          <InputText
            label="Campaña"
            width="425px"
            maxLength={9}
            value={""}
            onChange={() => {}}
            disabled={true}
          />
        </ContentRow>
        <Table width="855px" height="390px">
          <TableHeader>
            <TableCell width="60px">#</TableCell>
            <TableCell width="120px">Rut</TableCell>
            <TableCell width="444px">Nombre completo</TableCell>
            <TableCell width="120px">Incorporación</TableCell>
            <TableCell width="90px">Cargas</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {product && (
              <TableRow>
                <TableCell width="60px" align="center">
                  1
                </TableCell>
                <TableCell width="120px" align="right">
                  {product.insured.rut}
                </TableCell>
                <TableCell width="444px">
                  {`${product.insured.name} ${product.insured.paternalLastName} ${product.insured.maternalLastName}`}
                </TableCell>
                <TableCell width="120px" align="center">
                  {dbDateToText(product?.dates?.purchase)}
                </TableCell>
                <TableCell width="90px" align="center">
                  {product.beneficiaries?.length === 0
                    ? "No tiene"
                    : product.beneficiaries?.length}
                </TableCell>
              </TableRow>
            )}
          </TableDetail>
        </Table>
        <ContentRow align="space-between">
          <ContentRow gap="5px">
            <ContentCellSummary
              color={
                Object.keys(subscriptionItem.insured).length > 0
                  ? "blue"
                  : "#959595"
              }
            >
              {Object.keys(subscriptionItem.insured).length > 0
                ? Object.keys(subscriptionItem.insured).length === 1
                  ? `${
                      Object.keys(subscriptionItem.insured).length
                    } beneficiario`
                  : `${
                      Object.keys(subscriptionItem.insured).length
                    } beneficiarios`
                : `No hay beneficiarios`}
            </ContentCellSummary>
          </ContentRow>
          {product.subscription_id !== 0 && (
            <div className="space-x-2">
              <AddInsuredFromExcel
                subscriptionId={product?.subscription_id?.toString()}
                isOpen={isFileDialogOpen}
                setIsOpen={setIsFileDialogOpen}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />
              <AddInsured />
            </div>
          )}
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={isUploading} />
    </Fragment>
  );
};

export default ContractorInsured;

const AddInsuredFromExcel = ({
  subscriptionId,
  isOpen,
  setIsOpen,
  isUploading,
  setIsUploading,
}: {
  subscriptionId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}) => {
  const { getSubscriptionById } = useContractor();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    mutate: addInsuredFromExcel,
    isLoading,
    error,
  } = useQueryLead().useAddInsuredFromExcel();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    addInsuredFromExcel(
      { subscriptionId, file: selectedFile },
      {
        onSuccess: () => {
          getSubscriptionById(parseInt(subscriptionId));
          setSelectedFile(null);
          setIsOpen(false);
        },
      }
    );
  };

  useEffect(() => {
    if (isLoading) {
      setIsUploading(true);
    } else {
      setIsUploading(false);
    }
  }, [isLoading, setIsUploading]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden">
        <Button>Carga masiva</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Carga masiva de beneficiarios</DialogTitle>
          <Button
            type="button"
            size={"sm"}
            variant={"outline"}
            className="w-fit"
          >
            Descargar documento con formato
          </Button>
          <DialogDescription>
            Descarga el documento y rellenalo con los datos de los
            beneficiarios. Luego, sube el documento completado.
          </DialogDescription>
        </DialogHeader>
        <h2 className="font-bold text-teal-blue">
          Subir documento con los datos de los beneficiarios.
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input className="py-1" type="file" onChange={handleFileChange} />
          <Button type="submit" disabled={!selectedFile || isUploading}>
            {isUploading ? "Subiendo..." : "Subir"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddInsured = () => {
  return (
    <Dialog>
      <DialogTrigger className="hidden">
        <Button>Agregar beneficiario</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Agregar Beneficiario</DialogTitle>
          <DialogDescription>
            Completa los datos para agregar un beneficiario.
          </DialogDescription>
        </DialogHeader>
        <NewInsuredForm />
      </DialogContent>
    </Dialog>
  );
};

const NewInsuredForm = () => {
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

  const { list: districtList } = useDistrict();
  const { subscriptionItem, getSubscriptionById } = useContractor();

  const { mutate: addInsured } = useQueryLead().useAddInsured();

  const { data: person } = useQueryInsured().useGetByRut(rut);

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

  const send = async () => {
    try {
      addInsured(
        {
          subscription_id: subscriptionItem.subscription_id,
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
          },
        },
        {
          onSuccess: () => {
            reset();
            getSubscriptionById(Number(subscriptionItem.subscription_id));
          },
        }
      );
    } catch (error) {
      console.log(error);
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

  return (
    <form onSubmit={handleSubmit(send)} className="flex flex-col gap-2 py-2">
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
      <DialogFooter>
        <Button>Agregar</Button>
      </DialogFooter>
    </form>
  );
};
