import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  MenuFamilies,
  MenuProducts,
  MenuCustomerType,
} from "../components/functional/Menu";

import { useFamily, useProduct } from "../redux/hooks";
import { resetProduct } from "../redux/slices/productSlice";

import { useUI } from "../redux/hooks";

const Home: NextPage = () => {
  const router = useRouter();

  const { setAgentUI } = useUI();

  const { listAll: getAllFamilies, reset: resetFamily, family } = useFamily();
  const {
    getById: getProductById,
    getByFamilyId: getProductsByFamilyId,
    resetList: resetProductList,
    product,
  } = useProduct();

  const [menu, setMenu] = useState("FAM");

  const handleClickProduct = (product_id: string) => {
    getProductById(product_id);
  };

  const handleClickCustomerType = (type: string) => {
    router.push(`/contract/${type}/${product.id}`);
  };

  const handleClickBackToFamilies = () => {
    resetFamily();
    setMenu("FAM");
  };

  const handleClickBackToProducts = () => {
    resetProduct();
    resetProductList();
    getProductsByFamilyId(family.id);
    setMenu("PRO");
  };

  useEffect(() => {
    setAgentUI("020579a3-8461-45ec-994b-ad22ff8e3275");
    getAllFamilies();
  }, []);

  useEffect(() => {
    if (family.id !== "") {
      resetProduct();
      getProductsByFamilyId(family.id);
      setMenu("PRO");
    }
  }, [family.id]);

  useEffect(() => {
    if (product.id !== "") {
      resetProductList();
      setMenu("CUS");
    }
  }, [product.id]);

  return menu === "FAM" ? (
    <MenuFamilies />
  ) : menu === "PRO" ? (
    <MenuProducts
      handleClickBack={handleClickBackToFamilies}
      handleClickOption={handleClickProduct}
    />
  ) : (
    <MenuCustomerType
      handleClickBack={handleClickBackToProducts}
      handleClickOption={handleClickCustomerType}
    />
  );
};

export default Home;
