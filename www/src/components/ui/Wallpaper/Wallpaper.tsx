import React from "react";

import styles from "./Wallpaper.module.scss";
interface IWallpaper {
  img: string;
  width: string;
  height: string;
  children: any;
}
const Wallpaper = ({ img, width, height, children }: IWallpaper) => {
  return (
    <div className={styles.wallpaper}>
      <img
        className={styles.img}
        src={`${img}`}
        alt=""
        style={{
          width: "100%",
          height: `calc(100vw * ${height} / ${width})`,
        }}
      />
      {children}
    </div>
  );
};
const WallpaperLg = ({ img, width, height, children }: IWallpaper) => {
  return (
    <div className={styles.wallpaperlg}>
      <img
        className={styles.img}
        src={`${img}`}
        alt=""
        style={{
          width: "100%",
          height: `calc(100vw * ${height} / ${width})`,
        }}
      />
      {children}
    </div>
  );
};

export {Wallpaper, WallpaperLg};
