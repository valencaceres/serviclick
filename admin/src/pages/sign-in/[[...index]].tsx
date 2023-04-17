import { SignIn } from "~/components/functional/SignIn";
import { AuthLayout } from "~/components/layout/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
