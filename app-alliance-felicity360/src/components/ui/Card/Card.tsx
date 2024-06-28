import React from 'react';
import styles from "./Card.module.scss";

import Price from '../Price/Price';
import Discount from '../Discount/Discount';
import Beneficiary from '../Beneficiary/Beneficiary';
import Button from '../Button/Button';

interface CardProps {
  title: string;
  paragraph: string;
  traced: number;
  priceText: any;
  discountText: string;
  beneficiaryText?: any;
  buttonText: string;
  buttonLink: string;
  img: string;
}

const Card: React.FC<CardProps> = ({ title, paragraph, traced, priceText, discountText, beneficiaryText, buttonText, buttonLink, img }) => {
  return (

    <div className={styles.card}>
      <img src={`${img}`} className={styles.img} />
      <div className={styles.content}>
        
        <div className={styles.discounts}>
        <h2>{title}</h2>
          <h4>{traced}</h4>
          <Price text={priceText} />
          <Discount text={discountText} />
          {beneficiaryText && <Beneficiary text={beneficiaryText} />}
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
