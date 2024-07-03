import React from "react";

import styles from "./WallpaperVideo.module.scss";

const WallpaperVideo = ({ backgroundVideo, width, height, children }: any) => {
  return (
    <div
      className={styles.wallpaperVideo}
      style={{
        width: "100%",
        height: `calc(100vw * ${height} / ${width})`,
        objectFit: "cover",
      }}
    >
      <video className={styles.video} autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default WallpaperVideo;
