import React from 'react'
interface DiscountProps {
    text: string;
}
import styles from "./Discount.module.scss"

const Discount = ({ text }: DiscountProps) => {
    return (
        <div className={styles.dropShape}>
            <h3>{text}</h3>
        </div>
    )
}

export default Discount;