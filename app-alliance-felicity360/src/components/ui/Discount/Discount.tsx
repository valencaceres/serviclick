import React from 'react'
interface DiscountProps {
    text: string;
}
import styles from "./Discount.module.scss"

const Discount = ({ text }: DiscountProps) => {
    return (
        <div className={styles.dropShape}>
            <p>{text}</p>
        </div>
    )
}

export default Discount;