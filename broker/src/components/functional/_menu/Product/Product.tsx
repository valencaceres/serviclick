import { useRouter } from "next/router";

import { ContentCenter } from "../../../layout/Content";

import { MenuButtons, MenuItemPrice } from "../../../ui/MenuButtons";
import Loading from "../../../ui/Loading";

import { useUI, useBroker, useProduct, useLead } from "../../../../hooks";

const Product = () => {
  const router = useRouter();

  const { setCustomerTypeUI } = useUI();
  const { productList, loading } = useBroker();
  const { getById } = useProduct();
  const { setLeadProduct } = useLead();

  const handleClickProduct = (productItem: any, priceItem: "P" | "C") => {
    setCustomerTypeUI(priceItem);

    getById(productItem.id);

    setLeadProduct({
      id: productItem.id,
      price: productItem.price[priceItem],
      currency_code: productItem.currency,
      frequency_code: productItem.frequency,
      productPlan_id: 0,
    });

    router.push(`/sale/contract/${priceItem === "C" ? "company" : "customer"}`);
    return;
  };

  return loading ? (
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
