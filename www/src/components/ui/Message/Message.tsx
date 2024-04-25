import React from "react";

import styles from "./Message.module.scss";

import withScrollAnimation from "@/components/ui/Framer";

const Message = () => {
  const AnimateDiv = withScrollAnimation("div");
  return (
    <AnimateDiv>
    <div className={styles.message}>
      
      <p>
        TE ACOMPAÑAMOS <br /> EN TU DESAFÍO{" "}
      </p>
      <div></div>
    </div></AnimateDiv>
  );
};

export default Message;
