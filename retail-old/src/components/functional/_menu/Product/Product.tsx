import { useEffect } from "react";
import { useRouter } from "next/router";

import { ContentCenter } from "../../../layout/Content";

import { MenuButtons, MenuItemPrice } from "../../../ui/MenuButtons";
import Loading from "../../../ui/Loading";

import { useUI, useRetail, useProduct, useLead } from "../../../../hooks";

const Product = () => {
  const router = useRouter();

  const { setCustomerTypeUI, customerType, agentId, retail } = useUI();
  const { productList, loading } = useRetail();
  const { getProductById, product, productLoading } = useProduct();
  const { setLeadProduct, setLead, lead } = useLead();

  const handleClickProduct = (productItem: any, priceItem: "P" | "C") => {
    setCustomerTypeUI(priceItem);
    getProductById(productItem.id, agentId);
  };

  useEffect(() => {
    if (product.id !== "") {
      const customerTypeName: "customer" | "company" =
        customerType === "P" ? "customer" : "company";
      setLead({
        ...lead,
        agent_id: retail.id,
        company: {
          id: retail.id,
          rut: retail.rut,
          companyName: retail.name,
          legalRepresentative: retail.legalRepresentative,
          line: retail.line,
          address: retail.address,
          district: retail.district,
          email: retail.email,
          phone: retail.phone,
        },
        product: {
          id: product.id,
          price: product.price[customerTypeName],
          currency_code: product.currency,
          frequency_code: product.frequency,
          productPlan_id: product.plan[customerTypeName].id,
        },
      });
      router.push(`/sale/insured/${customerTypeName}`);
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
            onClickPrice={() => handleClickProduct(item, "C")}
            text={item.name}
            prices={[item.price.P, item.price.C]}
          />
        ))}
      </MenuButtons>
    </ContentCenter>
  );
};

export default Product;
