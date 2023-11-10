import type { NextPage, GetStaticProps } from "next";
import { useEffect } from "react";
import { useUI } from "~/store/hooks/index";

const HomePage: NextPage = (props) => {
  const { setTitle } = useUI();

  useEffect(() => {
    setTitle("Error 403");
  }, []);

  return (
    <div className="flex h-screen-nh flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-teal-blue">403</h1>
      <p>Ocurrió un error al intentar acceder a esta página.</p>
      <p className="text-sm italic">
        Si crees que se trata de un error, por favor contacta a soporte.
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = (ctx) => {
  return {
    props: {
      appEnv: process.env.APP_ENV || null,
    },
  };
};

export default HomePage;
