import React, {useEffect} from "react";
import { useRouter } from "next/router";

import DetailProduct from "./DetailProduct";
import DetailAssistance from "./DetailAssistance";
import DetailCoverage from "./DetailCoverage";
import DetailHeader from "./DetailHeader";

import { ContentCol } from "@/components/layout/Content";
import { useProduct } from "@/store/hooks";
import config from "@/utils/config";

import Conditions from "@/components/ui/Conditions/Conditions";
import Button from "@/components/ui/Button/Button";

const Detail = () => {
  const { getProductsById, product } = useProduct();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const productId = id.toString()
      getProductsById(productId);
    }
  }, [id]);

  return (
    <>
      <DetailHeader />
      {product && (
        <ContentCol paddingTop="20px" gap="30px" paddingBottom="90px">
          <DetailProduct product={product} />
          <DetailAssistance product={product} />
          <DetailCoverage product={product} />
          <Button text="¡LO QUIERO!" link={`${config.products}${product.productPlan_id}`} />
          {id === product.id && <Conditions />}
        </ContentCol>
      )}
    </>
  );
};

export default Detail;
