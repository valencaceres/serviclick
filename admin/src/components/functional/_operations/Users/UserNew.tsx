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
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .max(192)
    .refine((value) => passwordRegex.test(value), {
      message: "La contraseña debe contener al menos una mayúscula y un número",
    }),
  passwordConfirm: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .max(192)
    .refine((value) => passwordRegex.test(value), {
      message: "La contraseña debe contener al menos una mayúscula y un número",
    }),
  role_admin: z.string(),
  role_broker: z.string(),
  role_operations: z.string(),
  role_serviclick: z.string(),
  type_role_admin: z.string(),
  type_role_broker: z.string(),
  type_role_operations: z.string(),
  type_role_serviclick: z.string(),
});

export const NewUser: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(formSchema),
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

  const router = useRouter();
  const { mutate: createUser, isLoading } = api.users.create.useMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser(
      {
        name: values.name,
        last_name: values.last_name,
        email_address: values.email_address,
        password: values.password,
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
            <h1 className="text-2xl font-bold ">&gt; Crear Operador/a</h1>
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
                      <FormLabel>Contraseña</FormLabel>
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
                      <FormLabel>Repetir contraseña</FormLabel>
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
                watchAllFields.email_address &&
                  watchAllFields.name &&
                  watchAllFields.last_name &&
                  watchAllFields.password &&
                  watchAllFields.passwordConfirm &&
                  watchAllFields.type_role_admin &&
                  watchAllFields.type_role_broker &&
                  watchAllFields.type_role_operations &&
                  watchAllFields.type_role_serviclick
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
                      email_address: "",
                      name: "",
                      last_name: "",
                      password: "",
                      passwordConfirm: "",
                      type_role_admin: "user",
                      type_role_broker: "user",
                      type_role_operations: "user",
                      type_role_serviclick: "user",
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
                      <span>Creando</span>
                    </>
                  ) : (
                    "Crear"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
