import React from "react";

import styles from "./Content.module.scss";

interface ContentColProps {
  children: React.ReactNode;
  gap?: string;
  width?: string;
  alignItems?: "flex-start" | "center" | "flex-end";
  paddingTop?: string;
}

interface ContentRowProps {
  children: React.ReactNode;
  gap?: string;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: string;
  justifyContent?: "flex-start" | "center" | "flex-end";
}

const ContentCol = ({
  children,
  gap = "0",
  alignItems = "center",
  width = "auto",
  paddingTop = "0",
}: ContentColProps) => {
  return (
    <div
      className={styles.contentCol}
      style={{ gap, alignItems, width, paddingTop }}
    >
      {children}
    </div>
  );
};

const ContentRow = ({
  children,
  gap = "0",
  flexWrap = "nowrap",
  width = "auto",
  justifyContent = "flex-start",
}: ContentRowProps) => {
  return (
    <div
      className={styles.contentRow}
      style={{ gap, flexWrap, width, justifyContent }}
    >
      {children}
    </div>
  );
};

export { ContentCol, ContentRow };
