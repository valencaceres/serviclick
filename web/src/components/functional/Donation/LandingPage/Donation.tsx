import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../../../ui/Button";

import styles from "./Donation.module.scss";

import { useDonation, useProduct, useUI } from "../../../../redux/hooks";

const Donation = () => {
  const router = useRouter();

  const { agentId } = useUI();
  const { product } = useProduct();
  const { setDonation, donation } = useDonation();

  const handleClickDonation = (price: number) => {
    setDonation({
      ...donation,
      price,
      product_id: product.id,
      agent_id: agentId,
    });
    router.push("/donation/donor");
  };

  return (
    <div className={styles.donation}>
      <div className={styles.donationContent}>
        <div className={styles.title}>
          <div className={styles.text}>
            <div className={styles.line1}>Donación</div>
            <div className={styles.line2}>BiciCultura</div>
          </div>
          <a href="https://www.bicicultura.cl" target="_new">
            <Image
              src="/bicicultura/logo.png"
              width="213"
              height="71"
              alt="logo"
            />
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.image}></div>
          <div className={styles.text}>
            <p>
              <b>BiciCultura</b> nace por la voluntad de 15 socios y socias el
              año 2006, realiza trabajo de incidencia y gestión a nivel nacional
              y tiene su centro de operaciones en la Comuna de Ñuñoa.
            </p>
            <p>
              Somos una organización ciudadana sin fines de lucro (OSFL), no
              subvencionada, autónoma y autosustentada, profesionalizada en
              movilidad sustentable, que trabaja desde hace 13 años en Chile y
              que cuenta con estructura, equipo profesional, alianzas, redes y
              vasta experiencia de trabajo con el sector público, privado y
              social.
            </p>
            <div className={styles.buttons}>
              <p>Selecciona el monto de tu donación</p>
              <div className={styles.amountButtons}>
                <Button
                  width="102px"
                  text="$ 3.000"
                  onClick={() => handleClickDonation(3000)}
                />
                <Button
                  width="102px"
                  text="$ 5.000"
                  onClick={() => handleClickDonation(5000)}
                />
                <Button
                  width="102px"
                  text="$ 10.000"
                  onClick={() => handleClickDonation(10000)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
