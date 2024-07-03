import React from "react";
import styles from "./Price.module.scss";
import { formatCurrency } from "@/utils/number";

interface PriceProps {
  text: number;
}

const Price: React.FC<PriceProps> = ({ text }) => {
  return <h3 className={styles.price}>{`$${formatCurrency(text)}`}</h3>;
};

export default Price;
