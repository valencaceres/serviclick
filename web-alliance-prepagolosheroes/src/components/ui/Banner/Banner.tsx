import styles from "./Banner.module.scss";

import banner from "./images/banner.jpg";
import logo_white_customer from "./images/logo_white_customer.png";
import logo_white_serviclick from "./images/logo_white_serviclick.png";

const Banner = () => {
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${banner.src})` }}>
      <div className={styles.left}>
        <h1>
          ¡En ServiClick somos <span>especialistas</span> en protección!
        </h1>
        <div
          className={styles.logoServiClick}
          style={{
            backgroundImage: `url(${logo_white_serviclick.src})`,
          }}></div>
        <div
          className={styles.logo1}
          style={{ backgroundImage: `url(${logo_white_customer.src})` }}></div>
      </div>
    </div>
  );
};

export default Banner;
