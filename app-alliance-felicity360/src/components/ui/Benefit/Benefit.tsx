import React from 'react'

import styles from "./Benefit.module.scss"
interface benefitProps {
    img: string;
    text: string;

}
const Benefit = ({img, text}: benefitProps) => {
  return (
    <div className={styles.content}>
         <img src={`${img}`} className={styles.img} />
         <p>{text}</p>
    </div>
  )
}

export default Benefit