import React from 'react'

import styles from "./WallpaperVideo.module.scss"

const WallpaperVideo = ({ backgroundVideo, width, height, children }: any) => {
  return (
    <div className={styles.wallpaperVideo}>
    <video
      className={styles.video}
      autoPlay
      loop
      muted
      style={{
        width: "100%",
        height: `calc(100vw * ${height} / ${width})`,
        objectFit: "cover",
      }}
    >
      <source src={backgroundVideo} type="video/mp4" />
    </video>
    {children}
  </div>
  )
}

export default WallpaperVideo
