import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Component,
  Row,
  Cell,
  CellSeparator,
} from "../../components/layout/Component";
import Button from "../../components/ui/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLeadBySubscriptionId } from "../../redux/slices/leadSlice";
import { setSubscription } from "../../redux/slices/subscriptionSlice";

import styles from "./resume.module.scss";

const Error = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { lead } = useAppSelector((state) => state.leadSlice);

  const [isEnabled, setIsEnabled] = useState(false);

  const handleClickRetry = () => {
    router.push(
      `/contract/${lead.customer.rut !== "" ? "customer" : "company"}/${
        lead.product.id
      }`
    );
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      dispatch(setSubscription({ id: id ? parseInt(id.toString()) : 0 }));
      dispatch(getLeadBySubscriptionId(id ? parseInt(id.toString()) : 0));
      setIsEnabled(true);
    }
  }, [dispatch, router]);

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
        />
      </div>
    </div>
  );
};

export default Error;
