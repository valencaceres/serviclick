import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { setSession } from "../../../redux/slices/userInsuredSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Icon from "../../ui/Icon";

import styles from "./Product.module.scss";

type ProductT = {
  id: string;
  lead_id: string;
  family_icon: string;
  family_name: string;
  name: string;
  price: number;
  frequency_code: string;
  numberBeneficiaries: number;
};

type LeadT = {
  lead_id: string;
  customer_id: string;
  company_id: string;
  subscription_id: string;
  products: ProductT[];
};

const ProductList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userInsured, session } = useAppSelector(
    (state) => state.userInsuredSlice
  );

  const [products, setProducts] = useState<ProductT[]>([]);

  useEffect(() => {
    if (userInsured.id) {
      const productArray: ProductT[] = [];
      userInsured.leads.map((lead) =>
        lead.products.map((item) =>
          productArray.push({
            id: item.id,
            lead_id: lead.lead_id,
            family_icon: item.family_icon,
            family_name: item.family_name,
            frequency_code: item.frequency_code,
            name: item.name,
            price: item.price,
            numberBeneficiaries: item.numberBeneficiaries,
          })
        )
      );
      setProducts(productArray);
    }
  }, [userInsured]);

  const handleClickOption = (product: ProductT) => {
    dispatch(
      setSession({
        ...session,
        lead_id: product.lead_id,
        product_id: product.id,
        numberBeneficiaries: product.numberBeneficiaries,
        beneficiaries: userInsured.leads
          .filter((lead) => lead.lead_id === product.lead_id)[0]
          .products.filter((item) => item.id === product.id)[0].beneficiaries,
      })
    );
    router.push(`/product?id=${product.id}`);
  };

  return (
    <div className={styles.products}>
      <div className={styles.title}></div>
      <div className={styles.menu}>
        {products.map((product, idx: number) => (
          <button
            className={styles.option}
            key={idx}
            onClick={() => handleClickOption(product)}
          >
            <Icon iconName={product.family_icon} />
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
