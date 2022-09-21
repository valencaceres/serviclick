import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { setSession } from "../../../redux/slices/userCompanySlice";
import { ProductT } from "../../../redux/slices/companySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Icon from "../../ui/Icon";

import styles from "./Product.module.scss";

const ProductList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.companySlice);
  const { userInsured, session } = useAppSelector(
    (state) => state.userInsuredSlice
  );

  const handleClickOption = (product: ProductT) => {
    dispatch(
      setSession({
        ...session,
        product_id: product.id,
        beneficiaries: product.beneficiaries,
        insured: product.insured,
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
            onClick={() => handleClickOption(product)}>
            <Icon iconName={product.family_icon} />
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
