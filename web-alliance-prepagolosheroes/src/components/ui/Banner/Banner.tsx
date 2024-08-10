import styles from "./Banner.module.scss";

import banner from "./banner.jpg";

const Banner = () => {
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${banner.src})` }}>
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
