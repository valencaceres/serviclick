import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";

import InputText from "../../../ui/InputText/InputText";
import { PlusIcon } from "lucide-react";
import { Label } from "~/components/ui/Label";
import { Button } from "~/components/ui/ButtonC";
import { Input } from "~/components/ui/Input";
import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";
import ComboBox from "../../../ui/ComboBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";

import { emailRegEx, numberRegEx, rutRegEx } from "~/utils/regEx";
import { rutValidate } from "~/utils/validations";
import { formatRut, unFormatRut } from "~/utils/rut";

import { useContractor, useDistrict } from "../../../../hooks";
import { useQueryBeneficiary, useQueryLead } from "~/hooks/query";

import { IContractorInsured } from "~/interfaces/contractor";
import { useCustomer } from "~/store/hooks";

const ContractorBeneficiaries = ({ contractor }: any) => {
  const [rutInsured, setRutInsured] = useState("");
  const [insured, setInsured] = useState<IContractorInsured | undefined>(
    undefined
  );

  const { selectProduct, product } = useCustomer();

  const handleChangeProduct = (e: any) => {
    const existingProduct = contractor.origins.find(
      (item: any) => item?.product?.id === e.target.value
    );
    if (existingProduct) {
      selectProduct(existingProduct);
    }
  };

  const handleChangeInsured = (e: any) => {
    if (e.target.value !== "") {
      if (product.insured && product.insured.rut === e.target.value) {
        setRutInsured(product.insured.rut);
      } else {
        console.error("No se encontró el asegurado con el rut proporcionado");
        setInsured(undefined);
        setRutInsured("");
      }
    } else {
      setInsured(undefined);
      setRutInsured("");
    }
  };

  useEffect(() => {
    setRutInsured(product?.insured?.rut);
  }, [product?.insured]);

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
        <ContentRow gap="5px">
          <InputText
            label="Rut titular"
            width="200px"
            maxLength={9}
            value={rutInsured}
            onChange={(e: any) => setRutInsured(e.target.value)}
            disabled={true}
          />
          <ComboBox
            label="Nombre completo titular"
            width="650px"
            value={insured?.rut || ""}
            data={
              product?.insured
                ? [
                    {
                      rut: insured?.rut,
                      fullName: `${insured?.name} ${insured?.paternalLastName} ${insured?.maternalLastName}`,
                    },
                  ]
                : []
            }
            enabled={false}
            dataValue="rut"
            dataText="fullName"
          />
        </ContentRow>
      </ContentCell>
      <Table width="855px" height="200px">
        <TableHeader>
          <TableCell width="60px">#</TableCell>
          <TableCell width="120px">Rut</TableCell>
          <TableCell width="505px">Nombre completo</TableCell>
          <TableCell width="150px">Parentesco</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {product?.beneficiaries &&
            product?.beneficiaries.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="60px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="120px" align="right">
                  {item.rut}
                </TableCell>
                <TableCell width="505px">
                  {item.name +
                    " " +
                    item.paternalLastName +
                    " " +
                    item.maternalLastName}
                </TableCell>
                <TableCell width="150px">{item.relationship}</TableCell>
              </TableRow>
            ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentRow gap="5px">
          <ContentCellSummary
            color={
              product &&
              product?.beneficiaries &&
              product?.beneficiaries?.length > 0
                ? "blue"
                : "#959595"
            }
          >
            {(product?.beneficiaries?.length ?? 0) > 0
              ? (product?.beneficiaries?.length ?? 0) === 1
                ? `${product?.beneficiaries?.length} carga`
                : `${product?.beneficiaries?.length} cargas`
              : `No hay cargas`}
          </ContentCellSummary>
        </ContentRow>
        {product?.subscription_id !== 0 && <AddBeneficiary insured={insured} />}
      </ContentRow>
    </Fragment>
  );
};

export default ContractorBeneficiaries;

const AddBeneficiary = ({ insured }: any) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="h-10 w-10 rounded-full p-2">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Agregar Beneficiario</DialogTitle>
          <DialogDescription>
            Completa los datos para agregar un beneficiario.
          </DialogDescription>
        </DialogHeader>
        <NewBeneficiaryForm insured={insured} />
      </DialogContent>
    </Dialog>
  );
};

const NewBeneficiaryForm = ({ insured }: any) => {
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

  const { list: districtList } = useDistrict();
  const { subscriptionItem, getSubscriptionById } = useContractor();

  const { mutate: addBeneficiary } = useQueryLead().useAddBeneficiary();

  const { data: person } = useQueryBeneficiary().useGetByRut(rut);

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
    try {
      addBeneficiary(
        {
          insured_id: insured?.id,
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
            relationship,
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
      <div className="flex w-full flex-col">
        <Label htmlFor="email" className="text-xs text-dusty-gray">
          Parentesco
        </Label>
        <Input
          errorText={errors.relationship?.message}
          {...register("relationship", {
            required: "Este campo es requerido",
          })}
          type="text"
          id="relationship"
          placeholder="Parentesco"
          maxLength={9}
          className={`w-full ${
            errors?.relationship?.message?.length ? "border-red-500" : ""
          }`}
          value={relationship}
        />
      </div>
      <DialogFooter>
        <Button>Agregar</Button>
      </DialogFooter>
    </form>
  );
};
