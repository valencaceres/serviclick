import React, { ReactNode } from 'react'

import styles from "./ContentRow.module.scss"
interface Icontentrow{children:ReactNode, gap: string}
const ContentRow = ({ children,gap}:Icontentrow) => {
    return (
        <div className={`${styles.content_row}`} style={{ gap}}>{children}</div>
    );
};

export default ContentRow;