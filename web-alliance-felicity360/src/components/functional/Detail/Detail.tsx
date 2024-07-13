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

import config from "@/utils/config";

const LoadingSpinner = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ border: "4px solid #f3f3f3", borderTop: "4px solid #3498db", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 2s linear infinite" }}></div>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const Detail = () => {
  const { getProductsById, product, isLoading } = useProduct();
  const router = useRouter();
  const { id } = router.query;

  console.log(product)

  useEffect(() => {
    if (id) {
      const productId = id.toString();
      getProductsById(productId);
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
            <DetailCoverage product={product} />
            <Button text="¡LO QUIERO!" link={`${config.products}${product.productPlan_id}`} />
            {id === product.id && <Conditions />}
          </ContentCol>
        )
      )}
    </>
  );
};

export default Detail;