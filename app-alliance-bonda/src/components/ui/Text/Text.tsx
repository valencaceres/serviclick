import React from "react";

interface TextProps {
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  color?: string;
  textDecoration?: string;
  text: string;
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
    <div style={{ fontFamily, fontSize, fontWeight, color, textDecoration }}>
      {text}
    </div>
  );
};

export default Text;
