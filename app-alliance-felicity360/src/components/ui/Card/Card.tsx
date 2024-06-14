import React from 'react';
import styles from "./Card.module.scss";

import Price from '../Price/Price';
import Discount from '../Discount/Discount';
import Beneficiary from '../Beneficiary/Beneficiary';

interface CardProps {
  title: string;
  paragraph: string;
  traced: string;
  priceText: string;
  discountText: string;
  beneficiaryText: string;
}

const Card: React.FC<CardProps> = ({ title, paragraph, traced, priceText, discountText, beneficiaryText }) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{paragraph}</p>
      <div className={styles.discounts}>
        <h3>{traced}</h3>
        <Price text={priceText} />
        <Discount text={discountText} />
        <Beneficiary text={beneficiaryText} />
      </div>
    </div>
  );
};

export default Card;
