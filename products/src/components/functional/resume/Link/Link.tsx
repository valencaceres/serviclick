import { useEffect } from "react";

import { Body, Content, Footer, Col, Row } from "@/components/layout/Generic";

import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";

import { useLead } from "@/store/hooks";

import styles from "../Resume.module.scss";

const Link = ({ success }: any) => {
  const { lead, leadIsLoading } = useLead();

  const handleClickCopyLink = () => {
    navigator.clipboard.writeText(lead.link);
  };

  return (
    <Body>
      {leadIsLoading ? (
        <Loading />
      ) : (
        <Content>
          {success && lead.link ? (
            <Col gap="40px">
              <div className={styles.line}>
                <h2>Felicitaciones {lead.customer.name}</h2>
              </div>
              <Col gap="20px">
                <div className={styles.line}>
                  <p>
                    Hemos enviado exitósamente tu link de pago a tu correo{" "}
                    <b>{lead.customer.email}</b>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    Si quieres copiarlo a tu clipboard, da click en el botón más
                    abajo.
                  </p>
                </div>
              </Col>
              <div className={styles.line}>
                <Button
                  text="Copiar link"
                  onClick={handleClickCopyLink}
                  width="200px"
                />
              </div>
            </Col>
          ) : (
            <Col>
              <div>
                {lead.customer.name}, Hubo un problema al intentar enviar tu
                link de pago
              </div>
              <div>Por favor reintenta</div>
            </Col>
          )}
        </Content>
      )}
    </Body>
  );
};

export default Link;
