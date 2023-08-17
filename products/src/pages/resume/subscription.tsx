import { Fragment } from "react";
import { useRouter } from "next/router";

// import HeadPages from "../../components/layout/HeadPages";

import Button from "@/components/ui/Button";

import styles from "./resume.module.scss";

const Success = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push("https://www.serviclick.cl/alianza/sindicato1prosegur/");
  };

  return (
    <Fragment>
      {/* <HeadPages title="Exito" description="Pago exitoso" /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div className={styles.message}>
          <h1>Gracias por tu suscripción</h1>
          <p>
            Tu información fue registrada con éxito, tus datos están siendo
            validados por nuestro equipo, una vez confirmados, se suscribirá tu
            plan para ser descontado por planilla.
          </p>
          <Button
            text="Volver a la página Web"
            onClick={handleClickBack}
            width="250px"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Success;
