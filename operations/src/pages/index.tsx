import type { NextPage, GetStaticProps } from "next";
import { useEffect } from "react";

import Welcome from "../components/functional/Welcome";

import { useUI } from "../hooks";

interface PropsI {
  appEnv: string;
}

const HomePage: NextPage<PropsI> = (props) => {
  const { setEnvAppUI } = useUI();

  const { appEnv } = props;

  useEffect(() => {
    setEnvAppUI(appEnv);
  }, []);

  return <Welcome />;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      appEnv: process.env.APP_ENV || null,
    },
  };
};

export default HomePage;
