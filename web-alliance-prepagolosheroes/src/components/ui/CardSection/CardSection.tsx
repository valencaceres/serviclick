import React from "react";

import style from "./CardSection.module.scss";

const CardSection = ({ children }: any) => {
  return <div className={style.cardSection}>{children}</div>;
};

export default CardSection;
