import { Fragment } from "react";
import { useRouter } from "next/router";

import HeadPages from "../../components/layout/HeadPages";

import Button from "../../components/ui/Button";

import styles from "./resume.module.scss";

const Success = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push("https://www.serviclick.cl/");
  };

  return (
    <Fragment>
      <HeadPages title="Exito" description="Pago exitoso" />
      <div>
        <div className={styles.message}>
          <h1>Gracias por tu compra</h1>
          <p>
            Hemos recibido tu pago, en unos minutos recibirás un correo
            electrónico con el comprobante junto con tus datos de acceso a
            nuestra plataforma para que puedas completar tu información y ver el
            detalle del servicio contratado.
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
