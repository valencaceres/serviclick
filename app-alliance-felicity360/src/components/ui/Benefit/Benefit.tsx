import React from 'react';
import styles from './Benefit.module.scss';

interface benefitProps {
  img: string;
  text: string;
}

const Benefit = ({ img, text }: benefitProps) => {
  return (
    <div className={styles.content}>
      <img src={`${img}`} className={styles.img} />
      <div className={styles.textContainer}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Benefit;
