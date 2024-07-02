import React from "react";
import { useRouter } from "next/router";

import DetailProduct from "./DetailProduct";
import DetailAssistance from "./DetailAssistance";
import DetailCoverage from "./DetailCoverage";
import DetailHeader from "./DetailHeader";

import { ContentCol } from "@/components/layout/Content";

import Conditions from "@/components/ui/Conditions/Conditions";
import Button from "@/components/ui/Button/Button";

import { productData } from "@/data/product";

const Detail = () => {
  const router = useRouter();
  const product = productData.find(
    (product) => product.id === router.query.prod
  );
  return (
    <>
      <DetailHeader />
      {product && (
        <ContentCol paddingTop="20px" gap="30px" paddingBottom="90px">
          <DetailProduct product={product} />
          <DetailAssistance product={product} />
          <DetailCoverage product={product} />
          <Button text="¡LO QUIERO!" link="" />
          <Conditions />
        </ContentCol>
      )}
    </>
  );
};

export default Detail;
