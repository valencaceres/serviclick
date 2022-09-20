import React from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import leadSlice from "../../../redux/slices/leadSlice";

import texts from "../../../utils/texts";
import Icon from "../../ui/Icon";

import styles from "./ProductBadge.module.scss";

const ProductBadge = () => {
  const { lead } = useAppSelector((state) => state.leadSlice);
  const { product } = useAppSelector((state) => state.productSlice);
  const { stage } = useAppSelector((state) => state.stageSlice);

  const { frequency } = texts;

  return (
    <div className={styles.productBadge}>
      $
      {(lead.insured.length === 0
        ? product.price[stage.type]
        : product.price[stage.type] * lead.insured.length
      )
        .toLocaleString("en-US")
        .replace(",", ".")}
    </div>
  );
};

export default ProductBadge;
