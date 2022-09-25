import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
  ProductDetail,
  ProductList,
} from "../../components/functional/_masters/Product";

import FloatMenu from "../../components/ui/FloatMenu";

import { useUI, useFamily, useProduct } from "../../hooks";

const Product = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll: listAllFamilies } = useFamily();
  const { reset, listAll, getById } = useProduct();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll();
  };

  const handleClickBack = () => {
    router.push("/masters/product");
  };

  const handleClickNew = () => {
    router.push("/masters/product?id=new");
  };

  const addProduct = () => {
    router.push("/masters/product?id=new");
  };

  const editProduct = (id: string) => {
    router.push(`/masters/product?id=${id}`);
  };

  const deleteProduct = () => {};

  useEffect(() => {
    setTitleUI("Producto");
    listAll();
    listAllFamilies();
  }, []);

  useEffect(() => {
    reset();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getById(router.query.id?.toString());
    }
  }, [router.query.id]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <ProductDetail />
      <FloatMenu
        options={[
          { icon: "home", function: handleClickHome },
          { icon: "arrow_back", function: handleClickBack },
          { icon: "add", function: handleClickNew },
          { icon: "save", function: handleClickBack },
        ]}
      />
    </Fragment>
  ) : (
    <Fragment>
      <ProductList
        addProduct={addProduct}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <FloatMenu
        options={[
          { icon: "home", function: handleClickHome },
          { icon: "refresh", function: handleClickRefresh },
          { icon: "add", function: handleClickNew },
        ]}
      />
    </Fragment>
  );
};

export default Product;
