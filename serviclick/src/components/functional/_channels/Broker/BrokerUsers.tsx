import React from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";
import ButtonIcon from "../../../ui/ButtonIcon";
import Icon from "../../../ui/Icon";

import { useBroker } from "../../../../hooks";
import { useBroker as useBrokerQuery } from "~/hooks/query";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { Button } from "~/components/ui/ButtonC";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

const BrokerUsers = ({ addNewUser, editUser, deleteUser }: any) => {
  const router = useRouter();
  const { broker } = useBroker();

  const { data } = useBrokerQuery().useGetAgents(router.query.id as string);
  return (
    <ContentCell gap="5px">
      <Table width="739px" height="226px">
        <TableHeader>
          <TableCell width="300px">Nombre</TableCell>
          <TableCell width="232px">E-mail</TableCell>
          <TableCell width="120px">Perfil</TableCell>
          <TableCell width="68px"></TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {data?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell width="300px">
                {item.user?.data?.first_name + " " + item.user?.data?.last_name}
              </TableCell>
              <TableCell width="232px">
                {item.user?.data?.email_addresses[0]?.email_address}
              </TableCell>
              <TableCell width="120px">
                {item?.profilecode === "A" ? "Administrador" : "Vendedor"}
              </TableCell>
              <TableCell width="68px" align="center">
                <TableIcons>
                  {/* <EditUser user={item.user} profilecode={item?.profilecode} />
                  <Icon
                    iconName="delete"
                    onClick={() => deleteUser(item.user)}
                  /> */}
                </TableIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={broker.users.length > 0 ? "blue" : "#959595"}
        >
          {broker.users.length === 0
            ? "Sin usuarios asociados"
            : broker.users.length === 1
            ? "1 usuario asociado"
            : `${broker.users.length} usuarios asociados`}
        </ContentCellSummary>
        {/* <ButtonIcon iconName="add" color="gray" onClick={addNewUser} /> */}
      </ContentRow>
    </ContentCell>
  );
};

export default BrokerUsers;

const EditUser = ({ user, profilecode }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [profileCode, setProfileCode] = React.useState(profilecode);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<{
    rut: string;
    profilecode: "S" | "A";
    name: string;
    lastname: string;
    maternallastname: string;
    email: string;
  }>();

  const { mutate } = useBrokerQuery().useUpdateAgent();

  const update = async () => {
    mutate(
      {
        id: user?.id,
        brokerId: router.query.id,
        rut: getValues("rut"),
        profilecode: profileCode,
        name: getValues("name"),
        lastname: getValues("lastname"),
        maternallastname: getValues("maternallastname"),
        email: getValues("email"),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["brokerAgents", router.query.id]);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Icon iconName="edit" />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(update)}>
          <div className="flex gap-2">
            <fieldset className="w-full">
              <Label htmlFor="rut">Rut</Label>
              <Input
                errorText={errors.rut?.message}
                {...register("rut")}
                id="rut"
                placeholder="Rut"
                defaultValue={user?.public_metadata?.rut}
              />
            </fieldset>
            <fieldset className="w-full">
              <Label htmlFor="email">Perfil</Label>
              <Select
                defaultValue={profilecode}
                value={profileCode}
                onValueChange={setProfileCode}
              >
                <SelectTrigger className="rounded-sm border-dusty-gray border-opacity-40 py-6">
                  <SelectValue placeholder="Tipo de perfil" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="S">Vendedor</SelectItem>
                  <SelectItem value="A">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </fieldset>
          </div>
          <fieldset className="w-full">
            <Label htmlFor="name">Nombres</Label>
            <Input
              {...register("name", {
                required: "Este campo es requerido",
              })}
              id="name"
              placeholder="Nombres"
              defaultValue={user?.first_name}
            />
          </fieldset>
          <div className="flex gap-2">
            <fieldset className="w-full">
              <Label htmlFor="lastname">Apellido paterno</Label>
              <Input
                {...register("lastname", {
                  required: "Este campo es requerido",
                })}
                id="lastname"
                placeholder="Apellido paterno"
                defaultValue={user?.last_name}
              />
            </fieldset>
            <fieldset className="w-full">
              <Label htmlFor="maternallastname">Apellido materno</Label>
              <Input
                {...register("maternallastname")}
                id="maternallastname"
                placeholder="Apellido materno"
                defaultValue={user?.public_metadata?.maternallastname}
              />
            </fieldset>
          </div>
          <fieldset>
            <Label htmlFor="email">E-mail</Label>
            <Input
              {...register("email", {
                required: "Este campo es requerido",
              })}
              id="email"
              placeholder="E-mail"
              defaultValue={user?.email_addresses[0]?.email_address}
            />
          </fieldset>
          <Button className="mt-4 w-full" disabled={isSubmitting}>
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
