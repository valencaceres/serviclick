import React from "react";
import Image from "next/image";

import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      {/* <Image alt="Loading" src="/filter-loader.gif" width={100} height={100} />
      <div>Por favor espere...</div> */}
    </div>
  );
};

export default Loading;
