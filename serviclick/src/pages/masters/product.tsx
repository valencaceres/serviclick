import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  ProductDetail,
  ProductList,
} from "../../components/functional/_masters/Product";

import useUI from "../../hooks/useUI";
import useProduct from "../../hooks/useProduct";

const Product = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useProduct();

  useEffect(() => {
    setTitleUI("Producto");
    listAll();
  }, []);

  return router.isReady && router.query.id ? (
    <ProductDetail />
  ) : (
    <ProductList />
  );
};

export default Product;
