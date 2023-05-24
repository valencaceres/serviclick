import React from "react";
import { useRouter } from "next/router";
import { useSession, useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/ButtonC";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

import { type APIResponseError, parseError } from "~/utils/errors";

const SIMPLE_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const SignIn: React.FC = () => {
  const router = useRouter();
  const { isLoaded, signIn, setSession } = useSignIn();
  const { isSignedIn } = useSession();

  if (isSignedIn) {
    void router.push("/");
  }
  const {
    register,
    getValues,
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
        identifier: getValues("email"),
        password: getValues("password"),
      });
      if (signInResponse.status === "complete") {
        await setSession(signInResponse.createdSessionId);
      } else {
        console.log(signInResponse);
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
