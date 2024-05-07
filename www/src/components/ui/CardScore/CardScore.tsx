import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CardScore.module.scss";

interface ICardScoreProps {
  title: number;
  text: string;
  duration: number;
  unitTextLeft?: string;
  unitTextRight?: string;
}

const CardScore: React.FC<ICardScoreProps> = ({
  title,
  text,
  duration,
  unitTextLeft,
  unitTextRight = "",
}) => {
  const [count, setCount] = useState(0);
  const [minTitle, setMinTitle] = useState(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    setMinTitle((prevMin) => Math.min(prevMin, title));
  }, [title]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (count <= minTitle) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, duration);
    }

    return () => clearInterval(interval);
  }, [count, minTitle, duration]);

  return (
    <div className={styles.cardScore}>
      <motion.h2 className={styles.cardTitle}>
        {unitTextLeft} {} {count} {unitTextRight} {}
      </motion.h2>
      <p className={styles.cardText}>{text}</p>
    </div>
  );
};

export default CardScore;
