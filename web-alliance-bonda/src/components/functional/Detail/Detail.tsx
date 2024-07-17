import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DetailProduct from "./DetailProduct";
import DetailAssistance from "./DetailAssistance";
import DetailCoverage from "./DetailCoverage";
import DetailHeader from "./DetailHeader";

import { ContentCol } from "@/components/layout/Content";

import Conditions from "@/components/ui/Conditions/Conditions";
import Button from "@/components/ui/Button/Button";

import { useProduct } from "@/store/hooks";

import LoadingSpinner from "@/components/ui/Spinner";

import config from "@/utils/config";

const Detail = () => {
  const { getAssistancesByBrokerIdAndProductId, product, isLoading } =
    useProduct();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const productId = id.toString();
      getAssistancesByBrokerIdAndProductId(productId);
    }
  }, [id]);

  return (
    <>
      <DetailHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        product && (
          <ContentCol paddingTop="20px" gap="30px" paddingBottom="90px">
            <DetailProduct product={product} />
            <DetailAssistance product={product} />
            <DetailCoverage product={product.assistances} />
            <Button
              text="¡LO QUIERO!"
              link={`${config.products}${product.productplan_id}`}
            />
            {id === product.product_id && <Conditions />}
          </ContentCol>
        )
      )}
    </>
  );
};

export default Detail;
