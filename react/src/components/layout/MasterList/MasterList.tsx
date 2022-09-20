import styles from "./MasterList.module.scss";

const MasterList = ({ children }: any) => {
  return <div className={styles.masterList}>{children}</div>;
};

const Title = ({ children }: any) => {
  return <div className={styles.title}>{children}</div>;
};

const Search = ({ children }: any) => {
  return <div className={styles.search}>{children}</div>;
};

const List = ({ children }: any) => {
  return <div className={styles.list}>{children}</div>;
};

const Buttons = ({ children }: any) => {
  return <div className={styles.buttons}>{children}</div>;
};

const Summary = ({ children }: any) => {
  return <div className={styles.summary}>{children}</div>;
};

const Pages = ({ children }: any) => {
  return <div className={styles.pages}>{children}</div>;
};

const Actions = ({ children }: any) => {
  return <div className={styles.actions}>{children}</div>;
};

export { MasterList, Title, Search, List, Buttons, Summary, Pages, Actions };
