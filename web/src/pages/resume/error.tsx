import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "../../components/ui/Button";

import styles from "./resume.module.scss";

import { useLead, useSubscription } from "../../redux/hooks";

const Error = () => {
  const router = useRouter();

  const { lead, getLeadBySubscriptionId, leadLoading } = useLead();
  const { setSubscription } = useSubscription();

  const [isEnabled, setIsEnabled] = useState(false);

  const handleClickRetry = () => {
    router.push(
      `/contract/${lead.customer.rut !== "" ? "customer" : "company"}/${
        lead.product.id
      }?leadId=${lead.id}`
    );
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setSubscription({ id: id ? parseInt(id.toString()) : 0 });
      getLeadBySubscriptionId(id ? parseInt(id.toString()) : 0);
      setIsEnabled(true);
    }
  }, [router]);

  return (
    <div>
      <div className={styles.message}>
        <h1>Ha ocurrido un error con tu compra</h1>
        <p>
          Posiblemente se trate del algún error en la información digitada, por
          ello la hemos guardado y puedes volver a intentar para revisarla y
          corregir lo que gustes.
        </p>
        <Button
          text="Volver a intentar"
          onClick={handleClickRetry}
          width="200px"
          enabled={isEnabled}
          loading={leadLoading}
        />
      </div>
    </div>
  );
};

export default Error;
