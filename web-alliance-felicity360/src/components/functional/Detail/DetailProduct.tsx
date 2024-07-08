import React from "react";

import styles from "./Detail.module.scss";

import Discount from "@/components/ui/Discount/Discount";
import Price from "@/components/ui/Price/Price";
import Beneficiary from "@/components/ui/Beneficiary/Beneficiary";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import { Text, NumberText } from "@/components/ui/Text/Text";

const DetailProduct = ({ product }: any) => {
  console.log(product)
  return (
    <ContentRow gap="20px" alignItems="center">
      <div className={styles.border}></div>
      <Text
        text={product.name}
        fontFamily="Inter"
        fontSize="32px"
        fontWeight={700}
        color="#03495c"
      />
      <NumberText
        text={product.basePrice}
        fontFamily="Inter"
        fontSize="20px"
        fontWeight={800}
        color="#5C5C5C"
        textDecoration="line-through"
      />
      <Price text={product.price} />
      <Discount text="20%" />
      {product.id === "08ce5e35-2214-418a-b59c-f012524f09ad" && (
        <Beneficiary text="$3.590  (cada carga)" />
      )}
    </ContentRow>
  );
};

export default DetailProduct;
