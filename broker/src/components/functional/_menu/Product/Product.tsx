import { useEffect } from "react";
import { useRouter } from "next/router";

import { ContentCenter } from "../../../layout/Content";

import { MenuButtons, MenuItemPrice } from "../../../ui/MenuButtons";
import Loading from "../../../ui/Loading";

import { useUI, useBroker, useProduct, useLead } from "../../../../hooks";

const Product = () => {
  const router = useRouter();

  const { setCustomerTypeUI, customerType, agentId } = useUI();
  const { productList, loading } = useBroker();
  const { getProductById, product, productLoading } = useProduct();
  const { setLeadProduct } = useLead();

  const handleClickProduct = (productItem: any, priceItem: "P" | "C") => {
    setCustomerTypeUI(priceItem);
    getProductById(productItem.id, agentId);
  };

  useEffect(() => {
    if (product.id !== "") {
      const customerTypeName: "customer" | "company" =
        customerType === "P" ? "customer" : "company";
      setLeadProduct({
        id: product.id,
        price: product.price[customerTypeName],
        currency_code: product.currency,
        frequency_code: product.frequency,
        productPlan_id: product.plan[customerTypeName].id,
      });
      router.push(`/sale/contract/${customerTypeName}`);
    }
  }, [product.id, customerType]);

  return loading || productLoading ? (
    <Loading />
  ) : (
    <ContentCenter>
      <MenuButtons>
        {productList.map((item: any, idx: number) => (
          <MenuItemPrice
            key={idx}
            onClickPrice1={() => handleClickProduct(item, "P")}
            onClickPrice2={() => handleClickProduct(item, "C")}
            text={item.name}
            prices={[item.price.P, item.price.C]}
          />
        ))}
      </MenuButtons>
    </ContentCenter>
  );
};

export default Product;
