import React from "react";
import { useRouter } from "next/router";

import { Body, Content, Footer, Col, Row } from "../../../layout/Generic";

import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";

import { useLead } from "../../../../store/hooks";

import styles from "../Resume.module.scss";

const SaleError = () => {
  const router = useRouter();

  const { lead, leadIsLoading } = useLead();

  const handleClickRetry = () => {
    router.push(lead.link);
  };

  return (
    <Body>
      {leadIsLoading ? (
        <Loading />
      ) : (
        <Content>
          <Col gap="40px">
            <div className={styles.line}>
              <h2>{lead.customer.name}, ha ocurrido un error</h2>
            </div>
            <Col gap="20px">
              <div className={styles.line}>
                <p>
                  Posiblemente se trate del algún error en la información
                  digitada, por ello la hemos guardado y puedes volver a
                  intentar para revisarla y corregir lo que gustes.
                </p>
              </div>
            </Col>
            <div className={styles.line}>
              <Button
                text="Volver a intentar"
                onClick={handleClickRetry}
                width="200px"
              />
            </div>
          </Col>
        </Content>
      )}
    </Body>
  );
};

export default SaleError;

// <div>
//   <div className={styles.line}>
//     <h2>Ha ocurrido un error con tu compra</h2>
//     <p>
//       Posiblemente se trate del algún error en la información digitada, por
//       ello la hemos guardado y puedes volver a intentar para revisarla y
//       corregir lo que gustes.
//     </p>
//     <Button
//       text="Volver a intentar"
//       onClick={handleClickRetry}
//       width="200px"
//     />
//   </div>
// </div>
