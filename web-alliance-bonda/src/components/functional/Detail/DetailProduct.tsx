import React from "react";

import styles from "./Detail.module.scss";

import Discount from "@/components/ui/Discount/Discount";
import Price from "@/components/ui/Price/Price";
import Beneficiary from "@/components/ui/Beneficiary/Beneficiary";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import { Text, NumberText } from "@/components/ui/Text/Text";

import { formatCurrency } from "@/utils/number";

const DetailProduct = ({ product }: any) => {
  return (
    <ContentRow gap="20px" alignItems="center">
      <div className={styles.border}></div>
      <Text
        text={product.product_name}
        fontFamily="Inter"
        fontSize="32px"
        fontWeight={700}
        color="#03495c"
      />
      <NumberText
        text={product.price.base_price}
        fontFamily="Inter"
        fontSize="20px"
        fontWeight={800}
        color="#5C5C5C"
        textDecoration="line-through"
      />
      <Price text={product.price.price} />
      <Discount text="20%" />
      {product.price.beneficiary_price > 0 && (
        <Beneficiary
          text={`$${formatCurrency(
            product.price.beneficiary_price
          )} (cada carga)`}
        />
      )}
    </ContentRow>
  );
};

export default DetailProduct;
