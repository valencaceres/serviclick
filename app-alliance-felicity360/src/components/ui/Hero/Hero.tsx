import styles from "./Hero.module.scss"

import WallpaperVideo from "../WallpaperVideo/WallpaperVideo";

interface HeroProps {
  title: string;
  firstLogo: string;
  secondLogo: string;
}

const Hero = ({ title, firstLogo, secondLogo }: HeroProps) => {
  const videoPath = "/img/hero/banner-video.mp4";
  return (
    <WallpaperVideo backgroundVideo={videoPath} width={1620} height={600}>
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
    </WallpaperVideo>
  )
}

export default Hero;
