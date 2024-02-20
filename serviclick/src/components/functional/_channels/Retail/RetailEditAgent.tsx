import React, { useEffect, useState } from "react";
import { useRetail as useRetailQuery } from "~/hooks/query";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { ScrollArea } from "~/components/ui/ScrollArea";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeIcon } from "lucide-react";
import { districtStore } from "~/store/zustand";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
const passwordValidation = z
  .string()
  .refine((value) => !value || value.length >= 8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  })
  .refine((value) => !value || value.length <= 192, {
    message: "La contraseña no puede tener más de 192 caracteres",
  })
  .refine((value) => !value || passwordRegex.test(value), {
    message: "La contraseña debe contener al menos una mayúscula y un número",
  });

const formSchema = z.object({
  paternallastname: z
    .string({
      required_error: "Debe ingresar un apellido",
    })
    .min(2, {
      message: "El apellido debe tener al menos 2 caracteres",
    })
    .max(192),
  maternallastname: z
    .string({
      required_error: "Debe ingresar un apellido",
    })
    .min(2, {
      message: "El apellido debe tener al menos 2 caracteres",
    })
    .max(192),
  name: z
    .string({
      required_error: "Debe ingresar un nombre",
    })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(192),
  email_address: z
    .string({ required_error: "Debe ingresar un email" })
    .min(5, { message: "El email debe de tener al menos 5 caracteres" })
    .email("Esto no es un email valido.")
    .max(192)
    .optional(),
  password: passwordValidation,
  passwordConfirm: passwordValidation,
  type_role_broker: z.string().optional(),
  type_role_retail: z.string().optional(),
  profileCode: z.string().optional(),
  district: z.string().optional(),
  rut: z.string().optional(),
});

const EditUser = ({ user, isEdit, setOpenDialog, openDialog }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { districts: districtList } = districtStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      paternallastname: "",
      type_role_broker: undefined,
      district: "",
      rut: "",
      profileCode: undefined,
      maternallastname: "",
      type_role_retail: undefined,
      email_address: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const watchAllFields = form.watch();

  useEffect(() => {
    form.reset({
      name: user?.user?.data?.first_name,
      paternallastname: user?.user?.data?.last_name,
      type_role_broker: user?.user?.data?.public_metadata?.roles?.broker,
      district: user?.district,
      rut: user?.rut,
      profileCode: user?.profilecode,
      maternallastname: user?.maternallastname,
      type_role_retail: user?.user?.data?.public_metadata?.roles?.retail,
      email_address: user?.user?.data?.email_addresses[0]?.email_address,
      password: "",
      passwordConfirm: "",
    });
  }, [user]);

  const { mutate } = useRetailQuery().useUpdateAgent();

  const update = async (values: z.infer<typeof formSchema>) => {
    mutate(
      {
        agentId: user?.user?.data?.id,
        retailId: router.query.id,
        profileCode: values.profileCode,
        rut: values.rut,
        maternallastname: values.maternallastname,
        paternallastname: values.paternallastname,
        district: values.district,
        name: values.name,
        email: values.email_address,
        rol_web_retail: values.type_role_broker,
        isEdit: isEdit,
        type_role_web_admin:
          user?.user?.data?.public_metadata?.roles?.web_admin,
        type_role_operations:
          user?.user?.data?.public_metadata?.roles?.operations,
        type_role_serviclick:
          user?.user?.data?.public_metadata?.roles?.serviclick,
        type_role_broker: user?.user?.data?.public_metadata?.roles?.broker,
        type_role_admin: user?.user?.data?.public_metadata?.roles?.admin,
        password: values.password,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["retailAgents", router.query.id]);
          setOpenDialog(false);
          form.reset();
        },
      }
    );
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white lg:h-[500px]">
        <ScrollArea className="px-2">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Editar usuario" : "Crear usuario"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(update)}>
              <FormField
                control={form.control}
                name="rut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>rut</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="max-w-full "
                        placeholder="ej: 111111"
                        id="rut"
                        disabled={
                          isEdit || user?.rut === "" || user?.rut === null
                        }
                        defaultValue={user?.rut}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileCode"
                render={({ field }) => (
                  <FormItem className="px-1">
                    <FormLabel>Perfil</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={user?.profilecode}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de perfil" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-100">
                          <SelectItem value="S">Vendedor</SelectItem>
                          <SelectItem value="A">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type_role_retail"
                render={({ field }) => (
                  <FormItem className="px-1">
                    <FormLabel>rol web retail</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        defaultValue={
                          user?.user?.data?.public_metadata?.roles?.retail
                        }
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de perfil" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-100">
                          <SelectItem value="user">Usuario</SelectItem>
                          <SelectItem value="moderator">Moderador</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="px-1">
                    <FormLabel>Región</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu districto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-100">
                          {districtList.map((region) => (
                            <SelectItem
                              key={region.district_name}
                              value={region.district_name}
                            >
                              {region.district_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-full "
                        placeholder="ej: Marcelo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paternallastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido paterno</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-full "
                        placeholder="ej: Montalva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maternallastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido materno</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-full "
                        placeholder="ej: Montalva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        defaultValue={user?.user?.data?.email}
                        placeholder="Correo electrónico"
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEdit === false && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Establecer contraseña</FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-full"
                            type={showPassword ? "text" : "password"}
                            placeholder="Repetir contraseña"
                            {...field}
                          />
                        </FormControl>
                        <EyeIcon
                          className="absolute  right-14 top-2 z-10 cursor-pointer md:top-9"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </EyeIcon>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Repetir contraseña establecida</FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-full"
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Repetir contraseña"
                            {...field}
                          />
                        </FormControl>
                        <EyeIcon
                          className="absolute  right-14 top-2 z-10 cursor-pointer md:top-9"
                          onClick={togglePasswordConfirmVisibility}
                        >
                          {showPasswordConfirm ? "Hide" : "Show"}
                        </EyeIcon>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {isEdit ? (
                <Button
                  className="mt-4 w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  className="mt-4 w-full"
                  type="submit"
                  disabled={
                    watchAllFields.password !== watchAllFields.passwordConfirm
                  }
                >
                  Guardar
                </Button>
              )}
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
