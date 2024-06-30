import React from 'react';
import styles from './Price.module.scss';

interface PriceProps {
    text: string;
}

const Price: React.FC<PriceProps> = ({ text }) => {
    return (
        <h3 className={styles.price}>{text}</h3>
    );
};

export default Price;
