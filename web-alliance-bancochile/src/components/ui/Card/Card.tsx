"use client";
import React, { useState } from "react";
import styles from "./Card.module.scss";
import { formatCurrency } from "@/utils/number";

interface Benefit {
  title: string;
  description: string;
  smallText?: string;
  iconSrc: string;
}

interface TextCard {
  title: string;
  paragraph: string;
  buttonText: string;
  buttonURL?: string;
  generatePdf?: () => void;
}

interface CardProps {
  imageSrc: string;
  planName: string;
  currentPrice: number;
  originalPrice: number;
  discount?: string;
  individualPlanText: string;
  buttonText: string;
  buttonURLCard?: string;
  benefits: Benefit[];
  textCard: TextCard[];
  backgroundColor?: string;
  buttonColor?: string;
}

import check from "./images/check.png";
import emoji from "./images/emoji.png";

import image1 from "./images/3fcc493c-e3fd-4a06-b78b-982f3c1a632e.png";
import image2 from "./images/a2061c16-27dd-4138-be4c-c09b3eacff32.png";
import image3 from "./images/b2e7cfb3-f68d-44a3-b288-53fa408e4722.png";

const jsonProducts: { [key: string]: any } = {
  "3fcc493c-e3fd-4a06-b78b-982f3c1a632e": image1,
  "a2061c16-27dd-4138-be4c-c09b3eacff32": image2,
  "b2e7cfb3-f68d-44a3-b288-53fa408e4722": image3,
};

const Card: React.FC<CardProps> = ({
  imageSrc,
  planName,
  currentPrice,
  originalPrice,
  discount,
  individualPlanText,
  buttonText,
  benefits,
  textCard,
  backgroundColor,
  buttonColor,
  buttonURLCard,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.borderTop}
        style={{ backgroundColor: backgroundColor }}></div>
      <img
        className={styles.image}
        src={jsonProducts[imageSrc].src}
        alt={planName}
      />
      <h2 className={styles.planName}>{planName}</h2>
      <div className={styles.pricing}>
        <span className={styles.currentPrice}>{`$${formatCurrency(
          currentPrice
        )}`}</span>
        <span className={styles.discount}>{discount}</span>
      </div>
      <span className={styles.originalPrice}>{`$${formatCurrency(
        originalPrice
      )}`}</span>
      <p className={styles.individualPlanText}>{individualPlanText}&nbsp;</p>
      <div className={styles.content}>
        <a href={buttonURLCard} target="_blank" rel="noopener noreferrer">
          <button
            className={styles.button}
            style={{ backgroundColor: buttonColor }}>
            {buttonText}
            <img className={styles.buttonImage} src={emoji.src} alt="emoji" />
          </button>
        </a>
        <div className={styles.benefits}>
          <h3>Beneficios</h3>
          <ul>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <div className={styles.container}>
                  <div className={styles.textwithicon}>
                    <span className={styles.firstword}></span>
                    &nbsp;{benefit.title}
                  </div>
                </div>
                <span>{benefit.smallText}</span>
                <p>{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {textCard.map((item, index) => (
        <div key={index} className={styles.textCard}>
          <div
            className={styles.borderTop}
            style={{ backgroundColor: backgroundColor }}></div>
          <h2>{item.title}</h2>
          <div className={styles.textContent}>
            <p
              className={`${styles.text} ${
                expandedIndex === index ? styles.expanded : ""
              }`}>
              {item.paragraph}
            </p>
            <button
              className={styles.toggleButton}
              onClick={() => toggleExpand(index)}>
              {expandedIndex === index ? "Ver menos." : "Ver más."}
            </button>
            <button onClick={item.generatePdf} className={styles.buttonPdf}>
              Descargar PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
