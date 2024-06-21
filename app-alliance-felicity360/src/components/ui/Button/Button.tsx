import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    link: string;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
    return (
        <Link target="_blank" href={link} passHref>
            <button className={styles.button}>{text}</button>
        </Link>
    );
};

export default Button;
