import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    link: string;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
    return (
        <Link  className={styles.button} href={link} passHref>
           {text}
        </Link>
    );
};

export default Button;
