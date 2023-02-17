import { currencyFormat, formatAmount } from "@/utils/format";
import { useRouter } from "next/router";

import { useUI, useProduct } from "@/store/hooks";

import styles from "./Description.module.scss";
import Loading from "@/components/ui/Loading";

const Description = () => {
  const router = useRouter();

  const { setUI, ui } = useUI();
  const { product, productIsLoading } = useProduct();

  const handleClickHire = () => {
    router.push(`/contractor?productPlanId=${ui.product.productPlan_id}`);
  };

  return (
    <div className={styles.landingPage}>
      {product.id && <Banner />}
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
      className={styles.landingBanner}
      style={{
        backgroundImage: `url(/images/products/banners/${product.id}.jpg)`,
      }}></div>
  );
};

const Coverage = () => {
  const { product, productIsLoading } = useProduct();

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

  return productIsLoading ? (
    <Loading />
  ) : (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderTitie}>Servicio</div>
        <div className={styles.tableHeaderTitie}>Límite</div>
        <div className={styles.tableHeaderTitie}>Máximo</div>
        <div className={styles.tableHeaderTitie}>Carencia</div>
      </div>
      <div className={styles.tableDetail}>
        {product.assistances.map((item, idx: number) => (
          <div className={styles.tableRow} key={`item_${idx}`}>
            <div className={styles.tableCell} key={`name_${idx}`}>
              {item.name}
            </div>
            <div className={styles.tableCell} key={`limit_${idx}`}>
              {limitDescription(item)}
            </div>
            <div className={styles.tableCell} key={`events_${idx}`}>
              {item.events === 0
                ? "Ilimitado"
                : item.events === 1
                ? `${item.events} evento`
                : `${item.events} eventos`}
            </div>
            <div className={styles.tableCell} key={`lack_${idx}`}>
              {item.lack} días
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
