import React from "react";
import styles from "./Card.module.scss";

import Price from "../Price/Price";
import Discount from "../Discount/Discount";
import Beneficiary from "../Beneficiary/Beneficiary";
import Button from "../Button/Button";

import { formatCurrency } from "@/utils/number";

interface CardProps {
  title: string;
  paragraph: string;
  basePrice: number;
  price: any;
  discountText: string;
  beneficiaryPrice?: any;
  buttonText: string;
  buttonLink: string;
  img: string;
}

const Card: React.FC<CardProps> = ({
  title,
  paragraph,
  basePrice,
  price,
  discountText,
  beneficiaryPrice,
  buttonText,
  buttonLink,
  img,
}) => {
  return (
    <div className={styles.card}>
    <img src={`${img}`} className={styles.img} />
    <div className={styles.content}>
      <div className={styles.header}>
        <h2>{title}</h2>
       <div className={styles.prices}>
       <h4>{`$${formatCurrency(basePrice)}`}</h4>
        <Price text={`$${formatCurrency(price)}`} />
        <Discount text={discountText} />
        {beneficiaryPrice && beneficiaryPrice > 0 && (
          <Beneficiary text={`${formatCurrency(beneficiaryPrice)} (cada carga)`} />
        )}
       </div>
      </div>
      <p>{paragraph}</p>
      <div className={styles.button}>
        <Button text={buttonText} link={buttonLink} />
      </div>
    </div>
  </div>
  
  );
};

export default Card;
