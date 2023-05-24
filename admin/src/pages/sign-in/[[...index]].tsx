import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SignIn } from "~/components/functional/SignIn";
import { AuthLayout } from "~/components/layout/AuthLayout";
import { useUI } from "~/store/hooks";

const SignInPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Iniciar Sesión");
  }, [setTitle]);

  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
