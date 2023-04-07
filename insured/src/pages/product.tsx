import { useEffect } from "react";
import { useRouter } from "next/router";

import { ProductList, ProductDetail } from "../components/functional/Product";

import { useUI } from "../zustand/hooks";

const ProductPage = () => {
  const router = useRouter();

  const { setTitle, setShowButtonBack } = useUI();

  useEffect(() => {
    setTitle("Mis productos");
    setShowButtonBack(true, "/");
  }, []);

  return router && router.isReady && router.query.id ? (
    <ProductDetail id={router.query.id} />
  ) : (
    <ProductList />
  );
};

export default ProductPage;
