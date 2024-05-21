import { type NextPage } from "next";
import { useEffect } from "react";
import { Dashboard } from "~/components/functional/Dashboard";
import SignIn from "~/components/functional/SignIn";
import { useUI } from "~/store/hooks/index";
import {useUser} from "~/store/hooks/index";

const DashboardPage: NextPage = () => {
  const { setTitle } = useUI();
  const {user} = useUser()

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return user.email && user.roles && user.roles.filter(role => role.name === "admin").length > 0 ? <Dashboard /> : <SignIn/>
};

export default DashboardPage;
