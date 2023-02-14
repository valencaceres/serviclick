import { currencyFormat, formatAmount } from "@/utils/format";
import { useRouter } from "next/router";

import { useUI, useProduct } from "../../../../store/hooks";

import styles from "./Description.module.scss";
import { useEffect } from "react";

const Description = () => {
  const router = useRouter();

  const { setUI, ui } = useUI();
  const { product } = useProduct();

  const handleClickHire = () => {
    router.push(`/contractor?productPlanId=${ui.product.productPlan_id}`);
  };

  return (
    <div className={styles.landingPage}>
      <Banner />
      <div className={styles.title}>{product.name}</div>
      <div className={styles.description}>{product.promotional}</div>
      <div className={styles.highlighted}>Plan mensual</div>
      <div className={styles.price}>{currencyFormat(product.plan.price)}</div>
      <button className={styles.button} onClick={handleClickHire}>
        Contrata aquí
      </button>
      <Coverage />
    </div>
  );
};

const Banner = () => {
  const { product } = useProduct();
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(/images/products/banners/${product.id}.jpg)`,
      }}></div>
  );
};

const Coverage = () => {
  const { product } = useProduct();

  const limitDescription = (item: any) => {
    const oDiv = [];

    if (item.maximum !== "") {
      oDiv.push(<div>{item.maximum}</div>);
    }

    if (item.amount > 0) {
      oDiv.push(
        <div>
          {item.maximum !== "" ? "Tope" : ""}{" "}
          {formatAmount(item.amount, item.currency)}{" "}
          {item.maximum !== "" ? "al mes" : ""}
        </div>
      );
    }

    return oDiv;
  };

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.headerTitie}>Servicio</div>
        <div className={styles.headerTitie}>Límite</div>
        <div className={styles.headerTitie}>Máximo</div>
        <div className={styles.headerTitie}>Carencia</div>
      </div>
      <div className={styles.detail}>
        {product.assistances.map((item, idx: number) => (
          <div className={styles.row} key={idx}>
            <div className={styles.cell}>{item.name}</div>
            <div className={styles.cell}>{limitDescription(item)}</div>
            <div className={styles.cell}>
              {item.events === 0
                ? "Ilimitado"
                : item.events === 1
                ? `${item.events} evento`
                : `${item.events} eventos`}
            </div>
            <div className={styles.cell}>{item.lack} días</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
