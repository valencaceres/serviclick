import React from "react";

import { useRouter } from "next/router";

import Conditions from "@/components/ui/Conditions/Conditions";
import Button from "@/components/ui/Button/Button";

import { ContentCol, ContentRow } from "@/components/layout/Content";

import { productData } from "@/data/product";
import DetailProduct from "./DetailProduct";
import DetailAssistance from "./DetailAssistance";
import DetailCoverage from "./DetailCoverage";

const Detail = () => {
  const router = useRouter();
  const product = productData.find(
    (product) => product.id === router.query.prod
  );
  return (
    <>
      <div
        style={{ height: "100px", backgroundColor: "#29abe2", width: "100%" }}
      ></div>
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
