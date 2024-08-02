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
}

interface CardProps {
  imageSrc: string;
  planName: string;
  currentPrice: number;
  originalPrice: number;
  discount?: string;
  individualPlanText: string;
  buttonText: string;
  benefits: Benefit[];
  textCard: TextCard[];
  backgroundColor?: string;
  buttonColor?: string;
}

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
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.borderTop}
        style={{ backgroundColor: backgroundColor }}
      ></div>
      <img className={styles.image} src={imageSrc} alt={planName} />
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
      <p className={styles.individualPlanText}>{individualPlanText}</p>
      <div className={styles.content}>
        <button
          className={styles.button}
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
          <img
            className={styles.buttonImage}
            src="/img/cards/emoji.png"
            alt="emoji"
          />
        </button>
        <div className={styles.benefits}>
          <h3>Beneficios</h3>
          <ul>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <div className={styles.title}>
                  <img
                    className={styles.benefitIcon}
                    src={benefit.iconSrc}
                    alt="icon"
                  />
                  <h4>{benefit.title}</h4>
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
            style={{ backgroundColor: backgroundColor }}
          ></div>
          <h2>{item.title}</h2>
          <div className={styles.textContent}>
            <p
              className={`${styles.text} ${
                expandedIndex === index ? styles.expanded : ""
              }`}
            >
              {item.paragraph}
            </p>
            <button
              className={styles.toggleButton}
              onClick={() => toggleExpand(index)}
            >
              {expandedIndex === index ? "Ver menos." : "Ver más."}
            </button>
            <button className={styles.buttonPdf}>Descargar PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
