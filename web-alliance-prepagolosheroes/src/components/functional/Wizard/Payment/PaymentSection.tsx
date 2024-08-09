import styles from "./Payment.module.scss";

const PaymentSection = ({ children, title, selected = false, state }: any) => {
  return (
    <div
      className={`${styles.paymentSection} ${
        selected ? " " + styles.selected : ""
      }`}>
      <div className={styles.title}>
        <input type="checkbox" onChange={(e: any) => state(e.target.checked)} />
        {title}
        <div>&nbsp;</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PaymentSection;
