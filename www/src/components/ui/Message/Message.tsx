import React from 'react';
import styles from "./Message.module.scss";

interface MessageProps {
  htmlContent: string;
  showLine?: boolean;
}

const Message: React.FC<MessageProps> = ({ htmlContent, showLine = true }) => {
  return (
    <div className={styles.message}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {showLine && <div className={styles.line}></div>}
    </div>
  );
};

export default Message;
