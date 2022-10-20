import React from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import leadSlice from "../../../redux/slices/leadSlice";

import texts from "../../../utils/texts";
import Icon from "../../ui/Icon";

import styles from "./DonationBadge.module.scss";

import { useDonation } from "../../../redux/hooks";

const DonationBadge = () => {
  const { donation } = useDonation();

  const { product } = useAppSelector((state) => state.productSlice);
  const { stage } = useAppSelector((state) => state.stageSlice);

  const { frequency } = texts;

  return (
    <div className={styles.productBadge}>
      ${donation.price.toLocaleString("en-US").replace(",", ".")}
    </div>
  );
};

export default DonationBadge;
