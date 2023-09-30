import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import RetailForm from "./RetailForm";
import RetailProduct from "./RetailProduct";
import RetailInsured from "./RetailInsured";
import RetailBeneficiaries from "./RetailBeneficiaries";
import RetailProductList from "./RetailProductList";
import RetailSubscription from "./RetailSubscription";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";
import { Section } from "../../../ui/Section";

import { useRetail } from "../../../../hooks";
import RetailCompanyForm from "./RetailCompanyForm";

const RetailDetail = () => {
  const router = useRouter();

  const {
    setRetailSelectedProduct,
    retailLoading,
    getRetailById,
    retail,
    getCustomersByRetailIdAndProductId,
  } = useRetail();

  const [isEditing, setIsEditing] = useState(false);

  // const handleSuscriptionRowClick = (item: retail.ISubscription) => {
  //   getSubscriptionById(item.subscription_id);
  // };

  const handleSetProduct = (item: any) => {
    setRetailSelectedProduct({
      product_id: item.product_id,
      productplan_id: item.productplan_id,
      name: item.name,
      campaign: "",
      price: { customer: item.price, company: 0 },
      currency: item.currency,
      frequency: item.frequency,
    });
    getCustomersByRetailIdAndProductId(retail.id, item.productplan_id);
  };

  const handleClickProduct = (item: any) => {
    handleSetProduct(item);
  };

  useEffect(() => {
    if (router.isReady) {
      getRetailById(router.query.id as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (retail && retail.products && retail.products.length > 0) {
      handleSetProduct(retail.products[0]);
    }
  }, [retail]);

  return (
    <Fragment>
      <ContentCell align="center" gap="20px">
        <ContentRow gap="20px">
          <ContentCell gap="5px">
            <Section title="Datos de la empresa" width="350px" />
            <RetailCompanyForm />
          </ContentCell>
          <ContentCell gap="5px">
            <Section title="Productos" width="485px" />
            <RetailProductList handleClickProduct={handleClickProduct} />
          </ContentCell>
        </ContentRow>
        <ContentCell gap="5px">
          <Section title="Detalle del producto" width="855px" />
          <RetailProduct />
        </ContentCell>
        <ContentCell gap="5px">
          <Section title="Beneficiarios" width="855px" />
          <RetailInsured />
        </ContentCell>
      </ContentCell>
      <LoadingMessage showModal={retailLoading} />
    </Fragment>
  );
};

export default RetailDetail;
