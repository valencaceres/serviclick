import { Fragment } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  MenuFamilies,
  MenuProducts,
  MenuCustomerType,
} from "../components/functional/Menu";
import { LoadingMessage } from "../components/ui/LoadingMessage";

import { useUI, useFamily, useProduct, useLead } from "../redux/hooks";

const Home: NextPage = () => {
  const router = useRouter();

  const { setAgentUI, agentId } = useUI();
  const { listAll: getAllFamilies, reset: resetFamily, family } = useFamily();
  const {
    getProductById,
    getProductsByFamilyId,
    resetProductList,
    resetProduct,
    product,
    productLoading,
  } = useProduct();
  const { setLeadAgent } = useLead();

  const [menu, setMenu] = useState("FAM");

  const handleClickProduct = (product_id: string) => {
    getProductById(product_id, agentId);
  };

  const handleClickCustomerType = (type: string) => {
    setLeadAgent(agentId);
    router.push(`/contract/${type}/${product.id}`);
  };

  const handleClickBackToFamilies = () => {
    resetFamily();
    setMenu("FAM");
  };

  const handleClickBackToProducts = () => {
    resetProduct();
    resetProductList();
    getProductsByFamilyId(family.id, agentId);
    setMenu("PRO");
  };

  useEffect(() => {
    setAgentUI("020579a3-8461-45ec-994b-ad22ff8e3275");
    getAllFamilies();
  }, []);

  useEffect(() => {
    if (family.id !== "") {
      getProductsByFamilyId(family.id, agentId);
      setMenu("PRO");
    }
  }, [family.id]);

  useEffect(() => {
    if (product.id !== "") {
      resetProductList();
      setMenu("CUS");
    }
  }, [product.id]);

  return (
    <Fragment>
      {menu === "FAM" ? (
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
      )}
      <LoadingMessage showModa={productLoading} />
    </Fragment>
  );
};

export default Home;
