"use client";
import React, { useState } from "react";
import styles from "./Chat.module.scss";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/img/chat/wsp.png" alt="" />
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
            <img src="/img/chat/send.png" alt="Icono" />
            Abrir Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
