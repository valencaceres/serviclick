import React from "react";
import { useRouter } from "next/router";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

import { type APIResponseError, parseError } from "~/utils/errors";

const SIMPLE_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const SignIn: React.FC = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (isSignedIn) {
    void router.push("/");
  }

  const {
    register,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({ mode: "all" });

  const email = watch("email");
  const password = watch("password");

  if (!isLoaded) {
    return null;
  }

  const submit = async () => {
    try {
      clearErrors();
      const signInResponse = await signIn.create({
        identifier: email,
        password: password,
      });
      if (signInResponse.status === "complete") {
        await setActive({ session: signInResponse.createdSessionId });
      }
    } catch (err) {
      setError("email", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex w-96 flex-col items-center gap-2 p-2"
    >
      <div className="w-full">
        <Label
          htmlFor="email"
          className="text-xs text-dusty-gray hover:text-dusty-gray-600"
        >
          Correo electrónico
        </Label>
        <Input
          errorText={errors.email?.message}
          {...register("email", {
            required: true,
            pattern: SIMPLE_REGEX_PATTERN,
          })}
          type="email"
          id="email"
          placeholder="Correo electrónico"
        />
      </div>
      <div className="w-full">
        <Label
          htmlFor="password"
          className="text-xs text-dusty-gray hover:text-dusty-gray-600"
        >
          Contraseña
        </Label>
        <Input
          errorText={errors.password?.message}
          {...register("password", {
            required: true,
            validate: (value) => value.length >= 4,
          })}
          type="password"
          id="password"
          placeholder="Contraseña"
        />
      </div>
      <Button
        disabled={
          isSubmitting ||
          !email ||
          !password ||
          Boolean(errors.email) ||
          Boolean(errors.password)
        }
        className="w-full"
      >
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};
