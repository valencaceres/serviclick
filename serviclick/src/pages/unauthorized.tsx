import type { NextPage, GetStaticProps } from "next";

import { useUI } from "../hooks";

const HomePage: NextPage = (props) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-teal-blue">No autorizado/a</h1>
      <p className="italic">
        No tienes permisos para acceder a la página solicitada. Por favor, habla
        con el administrador.
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
