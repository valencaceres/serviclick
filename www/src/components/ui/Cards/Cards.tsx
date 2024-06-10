import React from 'react'

import styles from "./Cards.module.scss"

interface ICards { title: string; description: string; button: string; img: string; }
const Cards = ({ title, description, button, img }: ICards) => {
  return (
    <div className={styles.cards}>
      <img
        className={styles.img}
        src={`${img}`}
        style={{
          width: "335px",
          height: `calc(100vw * "200px" / "335px")`,
        }}
        alt=""
      />
      <div className={styles.text}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button>{button}</button>
      </div>
    </div>
  )
}

export default Cards