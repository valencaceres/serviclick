import styles from "./Hero.module.scss"

import WallpaperVideo from "../WallpaperVideo/WallpaperVideo";

interface HeroProps {
  title: string;
  firstLogo: string;
  secondLogo: string;
}

const Hero = ({ title, firstLogo, secondLogo }: HeroProps) => {
  const videoPath = "/video/banner.mp4";
  return (
   
    <div className={styles.hero}>
      <div className={styles.header}>
        <img src={firstLogo} className={styles.logo} />
        <img src={secondLogo} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        </div>
      </div>
    </div>
   
  )
}

export default Hero;
