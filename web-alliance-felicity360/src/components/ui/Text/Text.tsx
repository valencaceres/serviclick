import React from "react";

import { formatCurrency } from "@/utils/number";

import styles from './Text.module.scss'

interface TextProps {
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  color?: string;
  textDecoration?: string;
  text?:string;
}
interface NumberTextProps {
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  color?: string;
  textDecoration?: string;
  text?:any;
}
const Text = ({
  fontFamily,
  fontSize,
  fontWeight,
  color,
  textDecoration,
  text,
 
}: TextProps) => {
  return (
    <div style={{ fontFamily, fontWeight, color, textDecoration }} className={styles.text}>
      {text}
    </div>
  );
};

const NumberText = ({
  fontFamily,
  fontSize,
  fontWeight,
  color,
  textDecoration,
  text
}: NumberTextProps) => {
  return (
    <div style={{ fontFamily, fontSize, fontWeight, color, textDecoration }}>
      {`$${formatCurrency(text)}`}
    </div>
  );
};


export {Text, NumberText};
