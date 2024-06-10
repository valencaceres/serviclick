import React from "react";
import Link from "next/link";

import styles from "./Hero.module.scss";

import Logo from "@/components/ui/Logo";
import Message from "@/components/ui/Message";
import Menu from "@/components/ui/Menu/Menu";
import {
  WallpaperVideo,
  WallpaperVideo2,
} from "@/components/ui/WallpaperVideo/WallpaperVideo";

import withScrollAnimation from "@/components/ui/Framer";

interface HeroProps {
  message: string;
  showLine?: boolean;
}

const Hero: React.FC<HeroProps> = ({ message, showLine = true }) => {
  const videoPath = "/img/hero/video.mp4";
  const AnimateDiv = withScrollAnimation("div");

  return (
    <WallpaperVideo backgroundVideo={videoPath} width={1620} height={600}>
      <div className={styles.hero}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <AnimateDiv>
              <Link href="/">
                <Logo
                  width="214px"
                  height="31px"
                  img="/img/hero/logo.png"
                  secondImg="/img/hero/logosm.png"
                  secondImgWidth="42px"
                  secondImgHeight="42px"
                />
              </Link>
            </AnimateDiv>
          </div>
          <Menu searchIconColor="#03495C" closeIconColor="#B4CD25" />
        </div>
        <div className={styles.msg}>
          <Message htmlContent={message} showLine={showLine} />
        </div>
      </div>
    </WallpaperVideo>
  );
};

export default Hero;
