import Icon, { icons } from "../../ui/Icon";

import styles from "./Navigate.module.scss";

const Navigate = ({ children }: any) => {
  return <div className={styles.navigate}>{children}</div>;
};

const Home = ({ onClick }: any) => {
  return (
    <div className={styles.button}>
      <Icon iconName={icons.faHome} className={styles.icon} onClick={onClick} />
    </div>
  );
};

const Back = ({ onClick }: any) => {
  return (
    <div className={styles.button}>
      <Icon
        iconName={icons.faChevronLeft}
        className={styles.icon}
        onClick={onClick}
      />
    </div>
  );
};

export default Navigate;
export { Home, Back };
