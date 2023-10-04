import React from "react";

import { api } from "~/utils/api";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/utils/cn";
import { Loader2, EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/AlertDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/Accordion";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import { z } from "zod";
import { Button } from "~/components/ui/Button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { useRouter } from "next/router";
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
  last_name: z
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
    .max(192),
  password: passwordValidation,
  passwordConfirm: passwordValidation,
  role_admin: z.string(),
  role_broker: z.string(),
  role_operations: z.string(),
  role_serviclick: z.string(),
  type_role_admin: z.string(),
  type_role_broker: z.string(),
  type_role_operations: z.string(),
  type_role_serviclick: z.string(),
});

export const UserEdit: React.FC = () => {
  const router = useRouter();
  const { mutate: deleteUser } = api.users.delete.useMutation();
  const { mutate: update, isLoading } = api.users.update.useMutation();
  const { data: user, isLoading: isLoadingUser } = api.users.getById.useQuery(
    {
      userId: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
      onSuccess: (data) => {
        if (data) {
          form.reset({
            name: data.firstName ?? "",
            last_name: data.lastName ?? "",
            email_address: data.emailAddresses[0]?.emailAddress,
            type_role_admin: data?.publicMetadata.roles?.admin,
            type_role_broker: data?.publicMetadata?.roles?.broker,
            type_role_operations: data?.publicMetadata?.roles?.operaciones,
            type_role_serviclick: data?.publicMetadata?.roles?.serviclick,
          });
        }
      },
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    /*   resolver: zodResolver(formSchema), */
    defaultValues: {
      name: "",
      last_name: "",
      role_admin: "admin",
      role_broker: "broker",
      role_operations: "operaciones",
      role_serviclick: "serviclick",
      type_role_admin: "user",
      type_role_broker: "user",
      type_role_operations: "user",
      type_role_serviclick: "user",
      email_address: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [confirmUserName, setConfirmUserNamee] = useState<string>("");
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    update(
      {
        user_id: router.query.id as string,
        name: values.name,
        last_name: values.last_name,
        email_address: values.email_address,
        password: values.password ?? "",
        role_admin: "admin",
        role_broker: "broker",
        role_operations: "operaciones",
        role_serviclick: "serviclick",
        type_role_admin: values.type_role_admin as
          | "user"
          | "admin"
          | "moderator",
        type_role_broker: values.type_role_broker as
          | "user"
          | "admin"
          | "moderator",
        type_role_operations: values.type_role_operations as
          | "user"
          | "admin"
          | "moderator",
        type_role_serviclick: values.type_role_serviclick as
          | "user"
          | "admin"
          | "moderator",
      },
      {
        onSuccess: () => {
          void router.push("/operations/users");
        },
        onError: (error) => {
          console.error("Form submission failed:", error);
        },
      }
    );
  }
  const watchAllFields = form.watch();
  const isEqual = watchAllFields.password === watchAllFields.passwordConfirm;

  return (
    <>
      <div className="flex w-full flex-col gap-4 pb-20">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Link href="/operations/users">
              <h1 className="border-b-2 border-transparent text-2xl font-bold  duration-75 hover:border-black">
                Operadores
              </h1>
            </Link>
            <h1 className="text-2xl font-bold ">
              {" "}
              &gt; {isLoadingUser ? "Cargando..." : user?.firstName}
            </h1>
          </div>
        </div>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Card className="flex flex-col md:flex-row">
              <CardHeader className="w-full md:w-1/2">
                <CardTitle className="text-xl">Datos personales</CardTitle>
                <CardDescription>
                  Estos campos son detalles del operador, como su nombre,
                  apellido, email , contraseña.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex w-full flex-col gap-2 p-4 md:w-1/2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-full "
                          placeholder="ej: Maria"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-full"
                          placeholder="ej: Maria"
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
                          disabled={true}
                          className="max-w-full"
                          placeholder="ej: serviclick@cl.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cambiar contraseña</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-full"
                          type={showPassword ? "text" : "password"}
                          placeholder="Repetir contraseña"
                          {...field}
                        />
                      </FormControl>
                      <EyeIcon
                        className="absolute right-10 top-[590px] cursor-pointer md:top-[470px]"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Hide" : "Show"} Password
                      </EyeIcon>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repetir contraseña cambiada</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-full"
                          type={showPasswordConfirm ? "text" : "password"}
                          placeholder="Repetir contraseña"
                          {...field}
                        />
                      </FormControl>
                      <EyeIcon
                        className="absolute right-10 top-[680px] cursor-pointer md:top-[560px]"
                        onClick={togglePasswordConfirmVisibility}
                      >
                        {showPasswordConfirm ? "Hide" : "Show"} Password
                      </EyeIcon>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isEqual === false && watchAllFields.password !== "" && (
                  <p className="text-red-500">Las contraseñas no son iguales</p>
                )}
              </CardContent>
            </Card>
            <Card className="flex flex-col md:flex-row">
              <CardHeader className="w-full md:w-1/2">
                <CardTitle>Roles</CardTitle>
                <CardDescription>
                  Asigne un rol al usuario, puede ser, usuario, admin o
                  operador.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex w-full flex-col gap-2 p-4 md:w-1/2">
                <FormField
                  control={form.control}
                  name="type_role_admin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol del modulo admin</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="max-w-full md:max-w-full">
                            <SelectValue placeholder="Seleccione rol..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"admin"}>
                              Administrador
                            </SelectItem>
                            <SelectItem value={"moderator"}>
                              Operador
                            </SelectItem>
                            <SelectItem value={"user"}>Usuario</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type_role_broker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol del modulo broker</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="max-w-full md:max-w-full">
                            <SelectValue placeholder="Seleccione rol..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"admin"}>
                              Administrador
                            </SelectItem>
                            <SelectItem value={"moderator"}>
                              Operador
                            </SelectItem>
                            <SelectItem value={"user"}>Usuario</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type_role_operations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol del modulo operations</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="max-w-full md:max-w-full">
                            <SelectValue placeholder="Seleccione rol..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"admin"}>
                              Administrador
                            </SelectItem>
                            <SelectItem value={"moderator"}>
                              Operador
                            </SelectItem>
                            <SelectItem value={"user"}>Usuario</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type_role_serviclick"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol del modulo serviclick</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="max-w-full md:max-w-full">
                            <SelectValue placeholder="Seleccione rol..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"admin"}>
                              Administrador
                            </SelectItem>
                            <SelectItem value={"moderator"}>
                              Operador
                            </SelectItem>
                            <SelectItem value={"user"}>Usuario</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <div
              className={cn(
                "fixed bottom-0 left-0 right-0 flex justify-end overflow-hidden bg-[#B4CD25] p-4 shadow-lg duration-75",
                watchAllFields.email_address !==
                  user?.emailAddresses[0]?.emailAddress ||
                  watchAllFields.last_name !== user?.lastName ||
                  watchAllFields.name !== user?.firstName ||
                  watchAllFields.type_role_admin !==
                    user?.publicMetadata?.roles?.admin ||
                  watchAllFields.type_role_broker !==
                    user?.publicMetadata?.roles?.broker ||
                  watchAllFields.type_role_operations !==
                    user?.publicMetadata?.roles?.operaciones ||
                  watchAllFields.type_role_serviclick !==
                    user?.publicMetadata?.roles?.serviclick ||
                  watchAllFields.password !== ""
                  ? "bottom-0"
                  : "-bottom-20"
              )}
            >
              <div className="flex gap-2">
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() => {
                    form.reset({
                      email_address: user?.emailAddresses[0]?.emailAddress,
                      name: user?.firstName ?? "",
                      last_name: user?.lastName ?? "",
                      password: "",
                      passwordConfirm: "",
                      type_role_admin: user?.publicMetadata?.roles?.admin,
                      type_role_broker: user?.publicMetadata?.roles?.broker,
                      type_role_operations:
                        user?.publicMetadata?.roles?.operaciones,
                      type_role_serviclick:
                        user?.publicMetadata?.roles?.serviclick,
                    });
                  }}
                >
                  Reiniciar
                </Button>
                <Button
                  type="submit"
                  disabled={
                    watchAllFields.password !==
                      watchAllFields.passwordConfirm || isLoading
                  }
                >
                  {form.formState.isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Actualizando</span>
                    </>
                  ) : (
                    "Actualizar"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <Card className="my-12 flex items-center justify-between border-red-700 hover:border-red-800">
          <CardHeader className="w-1/2">
            <CardTitle className="text-xl text-red-600">
              Eliminar Usuario
            </CardTitle>
            <CardDescription className="text-red-600">
              Eliminar un Usuario es una acción irreversible, se perderán todos
              los datos asociados al usuario.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex w-1/2 p-4">
            <AlertDialog>
              <Accordion type="single" collapsible>
                <AccordionItem className="border-none" value="item-1">
                  <AccordionTrigger className="font-bold text-red-600">
                    Desplegar botón
                  </AccordionTrigger>
                  <AccordionContent>
                    <AlertDialogTrigger className="rounded-md bg-red-600 p-2 font-bold text-white hover:bg-red-500 focus:bg-red-400 active:bg-red-400">
                      Eliminar
                    </AlertDialogTrigger>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-500">
                    ¿Estás absolutamente seguro/a?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-red-500">
                    Esta acción no se puede deshacer. Esta eliminará el usuario
                    permanentemente.
                  </AlertDialogDescription>
                  <div className="py-2">
                    <Label htmlFor="field-name" className="text-red-500">
                      Escribe {""}
                      <span className="font-bold">{`"${
                        user?.firstName ?? ""
                      }"`}</span>{" "}
                      para confirmar
                    </Label>
                    <Input
                      id="field-name"
                      placeholder="Nombre del alumno"
                      value={confirmUserName}
                      onChange={(e) => setConfirmUserNamee(e.target.value)}
                    />
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={confirmUserName !== user?.firstName}
                    onClick={() =>
                      deleteUser(
                        { user_id: router.query.id as string },
                        {
                          onSuccess: () => {
                            void router.push(`/operations/users`);
                          },
                        }
                      )
                    }
                    className="bg-red-500 font-bold text-white hover:bg-red-600 focus:bg-red-500 active:bg-red-600"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
