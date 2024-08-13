"use client";
import React, { useState } from "react";
import styles from "./Chat.module.scss";

import send from "./images/send.png";
import wsp from "./images/wsp.png";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={wsp.src} alt="" />
          <span>WhatsApp</span>
        </div>
        <button className={styles.closeButton} onClick={toggleChat}>
          {isOpen ? "×" : "+"}
        </button>
      </div>
      {isOpen && (
        <div className={styles.messageContainer}>
          <p>
            ¡Hola! <br /> Me interesa una asistencia
          </p>
          <button className={styles.chatButton}>
            <img src={send.src} alt="Icono" />
            Abrir Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
