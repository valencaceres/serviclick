import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useUI } from "../../../../redux/hooks";

import styles from "./BiciCultura.module.scss";
import Button from "../../../ui/Button";

const BiciCultura = () => {
  const router = useRouter();

  const { setAgentUI, isDesktop } = useUI();

  const handleClickContract = () => {
    router.push("/contract/customer/1a6d08b0-f27a-4de0-8e1d-855bead4282f");
  };

  const handleClickDonate = () => {
    router.push("/donation/bicicultura");
  };

  useEffect(() => {
    setAgentUI("23027cc2-c294-4125-8d61-c8b23626d996");
  }, []);

  return (
    <div className={styles.biciCultura}>
      <div className={styles.title}>
        <div className={styles.line1}>Asistencia al Ciclista</div>
        <div className={styles.line2}>BiciCultura</div>
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <div className={styles.description}>
            <div className={styles.text}>
              Para que pedalees tranquilo y protegido por las calles, con esta
              asistencia podrás contar con ayuda inmediata en caso de que así lo
              necesites.
            </div>
            <div className={styles.text}>
              Asistencia disponible para el territorio nacional de Chile,
              incluyendo el área continental y la isla de Chiloé.
            </div>
            <a href="/bicicultura/Asistencia_WEB_Bicicultura.pdf" target="new">
              Ver detalles de la asistencia
            </a>
            <Button
              text="Contratar"
              width="150px"
              onClick={handleClickContract}
            />
          </div>
          <div className={styles.coverages}>
            <table className={styles.tableDesktop}>
              <thead>
                <tr>
                  <td>Servicio</td>
                  <td>Limite</td>
                  <td>Eventos al año</td>
                  <td>Carencia</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Urgencia médica en accidentes</td>
                  <td>$90.000</td>
                  <td>2 eventos</td>
                  <td rowSpan={5}>25 días</td>
                </tr>
                <tr>
                  <td>Descuento en farmacias</td>
                  <td>50% de boleta c/tope $10.000/mes</td>
                  <td>Ilimitados</td>
                </tr>
                <tr>
                  <td>Telemedicina</td>
                  <td>100%</td>
                  <td>2 eventos</td>
                </tr>
                <tr>
                  <td>Orientación médica telefónica</td>
                  <td>100%</td>
                  <td>4 eventos</td>
                </tr>
                <tr>
                  <td>Asistencia legal</td>
                  <td>100%</td>
                  <td>4 eventos</td>
                </tr>
              </tbody>
            </table>
            <table className={styles.tableMobile}>
              <thead>
                <tr>
                  <td>Servicio</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Urgencia médica en accidentes
                    <br />
                    Limite $90.000
                    <br />2 eventos al año
                  </td>
                </tr>
                <tr>
                  <td>
                    Descuento en farmacias
                    <br />
                    Limite 50% de boleta c/tope $10.000/mes
                    <br />
                    Ilimitados eventos al año
                  </td>
                </tr>
                <tr>
                  <td>
                    Telemedicina
                    <br />
                    Limite 100%
                    <br />2 eventos al año
                  </td>
                </tr>
                <tr>
                  <td>
                    Orientación médica telefónica
                    <br />
                    Limite 100%
                    <br />4 eventos al año
                  </td>
                </tr>
                <tr>
                  <td>
                    Asistencia legal
                    <br />
                    Limite 100%
                    <br />4 eventos al año
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className={styles.donate}>
        <div className={styles.content}>
          <a href="https://www.bicicultura.cl" target="_new">
            <Image
              src="/bicicultura/logo.png"
              width="213"
              height="71"
              alt="logo"
            />
          </a>
          <div className={styles.text}>
            También puedes realizar una donación a la organización BiciCultura,
            organización que impulsa el uso de la bicicleta como instrumento
            catalizador de una gran transformación social, ambiental, económica
            y cultural.
          </div>
          <Button text="Donar" width="150px" onClick={handleClickDonate} />
        </div>
      </div> */}
    </div>
  );
};

export default BiciCultura;
