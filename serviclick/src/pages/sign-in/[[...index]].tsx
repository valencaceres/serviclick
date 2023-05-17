import { useEffect } from "react";
import { SignIn } from "~/components/functional/SignIn/SignIn";
import { AuthLayout } from "~/components/layout/AuthLayout/AuthLayout";
import { useUI } from "~/hooks";

const SignInPage = () => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Iniciar Sesión");
  }, []);

  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
