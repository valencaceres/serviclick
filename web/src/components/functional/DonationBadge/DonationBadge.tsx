import styles from "./DonationBadge.module.scss";

import { useDonation } from "../../../redux/hooks";

const DonationBadge = () => {
  const { donation } = useDonation();

  return (
    <div className={styles.productBadge}>
      ${donation.price.toLocaleString("en-US").replace(",", ".")}
    </div>
  );
};

export default DonationBadge;
