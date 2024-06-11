import styles from "./Hero.module.scss"

interface HeroProps {
   title: string;
  }
const Hero = ({title}:HeroProps) => {
  return (
    <div className={styles.hero}>
        <h1>{title}</h1>
    </div>
    
  )
}

export default Hero