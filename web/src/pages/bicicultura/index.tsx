import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useUI } from "../../redux/hooks";

import styles from "./bicicultura.module.scss";
import Button from "../../components/ui/Button";

const BiciCultura = () => {
  const router = useRouter();

  const { setAgentUI, isDesktop } = useUI();

  const handleClickContract = () => {
    router.push("/contract/customer/1a6d08b0-f27a-4de0-8e1d-855bead4282f");
  };

  const handleClickDonate = () => {
    router.push("/bicicultura/donate");
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
            <p>
              Para que pedalees tranquilo y protegido por las calles, con esta
              asistencia podrás contar con ayuda inmediata en caso de que así lo
              necesites.
            </p>
            <p>
              Asistencia disponible para el territorio nacional de Chile,
              incluyendo el área continental y la isla de Chiloé.
            </p>
            <a href="#">Ver detalles de la asistencia</a>
            <Button
              text="Contratar"
              width="150px"
              onClick={handleClickContract}
            />
          </div>
          <div className={styles.coverages}>
            {isDesktop ? (
              <table>
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
            ) : (
              <table>
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
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.content}>
          <a href="https://www.bicicultura.cl">
            <Image
              src="/bicicultura/logo.png"
              width="213"
              height="71"
              alt="logo"
            />
          </a>
          <p>
            También puedes realizar una donación a la organización BiciCultura,
            organización que impulsa el uso de la bicicleta como instrumento
            catalizador de una gran transformación social, ambiental, económica
            y cultural.
          </p>
          <Button text="Donar" width="150px" onClick={handleClickDonate} />
        </div>
      </div>
    </div>
  );
};

export default BiciCultura;
