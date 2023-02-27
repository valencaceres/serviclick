import * as SlugHook from "../../../hooks/store/useSlug";

import styles from "./Banner.module.scss";

const Banner = () => {
  const { slug } = SlugHook.default();

  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <h1>
          ¡En ServiClick somos <span>especialistas</span> en protección!
        </h1>
      </div>
      {/* {slug && (
        <div className={styles.right}>
          <div
            className={styles.logo}
            style={{ backgroundImage: `url(${slug?.logo || ""})` }}></div>
        </div>
      )} */}
    </div>
  );
};

export default Banner;
