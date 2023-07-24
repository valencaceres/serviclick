import { type NextPage } from "next";

const UnauthorizedPage: NextPage = () => {
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

export default UnauthorizedPage;
