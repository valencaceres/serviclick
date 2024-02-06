import { useEffect } from "react";
import { useRouter } from "next/router";

import { ProductList, ProductDetail } from "../components/functional/Product";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDistrict, useRelationship } from "../zustand/hooks";
import { useUI } from "../zustand/hooks";

const ProductPage = () => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const { getAllRelationships } = useRelationship();
  const { getDistricts } = useDistrict();
  const { setTitle, setShowButtonBack } = useUI();

  useEffect(() => {
    setTitle("Mis productos");
    setShowButtonBack(true, "/");
  }, []);

  useEffect(() => {
    getAllRelationships();
    getDistricts();
  }, []);
  return router && router.isReady && router.query.id ? (
    <QueryClientProvider client={queryClient}>
      <ProductDetail id={router.query.id} />
    </QueryClientProvider>
  ) : (
    <ProductList />
  );
};

export default ProductPage;
