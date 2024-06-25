import React from 'react';
import styles from './Assistance.module.scss';

interface AssistanceProps {
  img: string;
  text?: string;

}

const Assistance = ({ img, text}: AssistanceProps) => {
  return (
    <div className={styles.content}>
      <img src={`${img}`} className={styles.img} />
      <div className={styles.textContainer}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Assistance;
