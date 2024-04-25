import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./Score.module.scss";
import CardScore from "@/components/ui/CardScore";

interface IScoreProps {
  content: {
    title: number;
    text: string;
    duration: number;
    unitTextLeft?: string;
    unitTextRight?: string;
  }[];
}

const Score: React.FC<IScoreProps> = ({ content }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    });
  }, [controls]);

  return (
    <motion.div
      className={styles.background}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div className={styles.score}>
        {content &&
          content.map((item, index) => (
            <CardScore
              key={index}
              title={item.title}
              text={item.text}
              duration={item.duration}
              unitTextLeft={item.unitTextLeft}
              unitTextRight={item.unitTextRight}
            />
          ))}
      </div>
    </motion.div>
  );
};

export default Score;
