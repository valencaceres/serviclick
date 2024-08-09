import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <h1>
          ¡En ServiClick somos <span>especialistas</span> en protección!
        </h1>
        <div className={styles.logoServiClick}></div>
        <div className={styles.logo1}></div>
      </div>
    </div>
  );
};

export default Banner;
