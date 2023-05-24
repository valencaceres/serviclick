import { type NextPage } from "next";
import { useEffect } from "react";
import { Dashboard } from "~/components/functional/Dashboard";
import { useUI } from "~/store/hooks";

const DashboardPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return <Dashboard />;
};

export default DashboardPage;
