import React from "react";

import styles from "./Hero.module.scss";

import Logo from "@/components/ui/Logo";
import Message from "@/components/ui/Message";
import Menu from "@/components/ui/Menu/Menu";
import {
  WallpaperVideo,
  WallpaperVideo2,
} from "@/components/ui/WallpaperVideo/WallpaperVideo";

import withScrollAnimation from "@/components/ui/Framer";

const Hero = () => {
  const videoPath = "/img/hero/video.mp4";
  const AnimateDiv = withScrollAnimation("div");

  return (
    <WallpaperVideo backgroundVideo={videoPath} width={1620} height={600}>
      
        <div className={styles.hero}>
        
          <div className={styles.nav}>
          
            <div><AnimateDiv>
            <Logo
              width="214px"
              height="31px"
              img="/img/hero/logo.png"
              secondImg="/img/hero/logosm.png"
              secondImgWidth="42px"
              secondImgHeight="42px"
            /></AnimateDiv></div>
            
            <Menu />
          </div>
          <div className={styles.msg}>
            <Message />
          </div>
        </div>
      
    </WallpaperVideo>
  );
};

export default Hero;
