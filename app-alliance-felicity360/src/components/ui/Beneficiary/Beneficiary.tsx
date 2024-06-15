import React from 'react';
import styles from './Beneficiary.module.scss';

interface BeneficiaryProps {
    text?: string;
}

const Beneficiary: React.FC<BeneficiaryProps> = ({ text }) => {
    return (
        <h3 className={styles.beneficiary}>{text}</h3>
    );
};

export default Beneficiary;
