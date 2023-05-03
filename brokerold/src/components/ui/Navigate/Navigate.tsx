import Icon from "../../ui/Icon";

import styles from "./Navigate.module.scss";

const Navigate = ({ children }: any) => {
  return <div className={styles.navigate}>{children}</div>;
};

const Home = ({ onClick }: any) => {
  return (
    <div className={styles.button}>
      <span className="material-icons md-36">hoome</span>
    </div>
  );
};

const Back = ({ onClick }: any) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className="material-icons md-36">arrow_back</span>
    </button>
  );
};

export default Navigate;
export { Home, Back };
