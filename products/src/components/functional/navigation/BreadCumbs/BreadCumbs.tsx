import { useRouter } from "next/router";

import styles from "./BreadCumbs.module.scss";

import { useUI, useProduct, useLead } from "@/store/hooks";

const BreadCumbs = () => {
  const router = useRouter();

  const { ui } = useUI();
  const { product } = useProduct();
  const { lead } = useLead();

  const stageState = (item: any) => {
    switch (item.code) {
      case "description":
        return styles.enabled;
      case "contractor":
        return lead && lead.customer.rut !== ""
          ? styles.enabled
          : styles.disabled;
      case "insured":
        return lead &&
          lead.insured &&
          lead.insured.length > 0 &&
          lead.insured[0].rut !== ""
          ? styles.enabled
          : styles.disabled;
      case "product":
        return lead &&
          lead.insured &&
          lead.insured.length > 0 &&
          lead.insured[0].values &&
          lead.insured[0].values[0].value !== ""
          ? styles.enabled
          : styles.disabled;
      case "beneficiaries":
        return lead &&
          lead.insured &&
          lead.insured.length > 0 &&
          lead.insured[0].beneficiaries &&
          lead.insured[0].beneficiaries.length > 0
          ? styles.enabled
          : styles.disabled;
      case "payment":
        return lead && lead.link && lead.link !== ""
          ? styles.enabled
          : styles.disabled;
    }
  };

  const handleClickStage = (link: string, style: any) => {
    if (style === styles.enabled) router.push(`${link}?leadId=${lead.id}`);
  };

  return (
    <div className={styles.breadCumbs}>
      {ui.breadCumbs.map((item, idx: number) => {
        if (
          (item.code !== "product" && product.values.length === 0) ||
          product.values.length > 0
        ) {
          return (
            <div key={idx}>
              <div
                className={`${styles.item} ${
                  item.code === ui.stage.code
                    ? styles.current
                    : stageState(item)
                }`}
                onClick={() => handleClickStage(item.link, stageState(item))}>
                <div className={styles.number}>{item.number}</div>
                <div className={styles.text}>{item.text}</div>
              </div>
              {idx + 1 < ui.breadCumbs.length && (
                <div className={styles.separator}>&nbsp;</div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default BreadCumbs;
