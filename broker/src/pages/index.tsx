import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Dashboard } from "~/components/functional/Dashboard";
import { useUI } from "~/store/hooks";

const DashboardPage: NextPage = () => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return (
    <>
      <Head>
        <title>Serviclick.cl - Dashboard Administración</title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
