import { type NextPage } from "next";
import { useEffect } from "react";
import { Dashboard } from "~/components/functional/Dashboard";
import SignIn from "~/components/functional/SignIn";
import { useUI, useUser } from "~/store/hooks/index";

const DashboardPage: NextPage = () => {
  const { setTitle } = useUI();
  const { userItem } = useUser();

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return userItem.email &&
    userItem.roles &&
    userItem.roles.filter((role) => role.name === "admin").length > 0 ? (
    <Dashboard />
  ) : (
    <SignIn />
  );
};

export default DashboardPage;
