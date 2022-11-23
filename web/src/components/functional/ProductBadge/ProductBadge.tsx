import { useStage, useProduct, useLead } from "../../../redux/hooks";

import styles from "./ProductBadge.module.scss";

const ProductBadge = () => {
  const { stage } = useStage();
  const { product } = useProduct();
  const { lead } = useLead();

  return (
    <div className={styles.productBadge}>
      $
      {(lead.insured.length === 0
        ? product.plan[stage.type].price
        : product.plan[stage.type].price * lead.insured.length
      )
        .toLocaleString("en-US")
        .replace(",", ".")}
    </div>
  );
};

export default ProductBadge;
