import type { NextPage, GetStaticProps } from "next";
import { useEffect } from "react";
import { useUI } from "~/hooks";

const HomePage: NextPage = (props) => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Error 403");
  }, []);

  return (
    <div className="text-center h-screen-nh flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-teal-blue">403</h1>
      <p>Ocurrió un error al intentar acceder a esta página.</p>
      <p className="italic text-sm">
        Si crees que se trata de un error, por favor contacta a soporte.
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      appEnv: process.env.APP_ENV || null,
    },
  };
};

export default HomePage;
