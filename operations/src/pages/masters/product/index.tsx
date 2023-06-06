import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import {
  ProductDetail,
  ProductList,
} from "~/components/functional/_masters/Product";

import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import { useUI, useFamily, useProduct, useAssistance } from "~/hooks";
import { Button } from "~/components/ui/ButtonC";
import Icon from "~/components/ui/Icon";
import { useQueryProduct } from "~/hooks/query";

const Product = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setTitleUI } = useUI();

  const { data: products } = useQueryProduct().useListProducts("020579a3-8461-45ec-994b-ad22ff8e3275");

  useEffect(() => {
    setTitleUI("Producto");
  }, []);

  return (
    <>
      <ProductList products={products} />
      <FloatMenu>
        <Button
          className="h-10 w-10 rounded-full bg-teal-blue-300 p-0 hover:bg-teal-blue"
          onClick={() => router.push("/")}
          type="button"
        >
          <Icon iconName="home" size="24px" className="cursor-pointer" button />
        </Button>
        <Button
          className="h-10 w-10 rounded-full bg-teal-blue-300 p-0 hover:bg-teal-blue"
          onClick={() => queryClient.invalidateQueries(["products"])}
          type="button"
        >
          <Icon
            iconName="refresh"
            size="24px"
            className="cursor-pointer"
            button
          />
        </Button>
        <Button
          className="h-10 w-10 rounded-full bg-teal-blue-300 p-0 hover:bg-teal-blue"
          onClick={() => router.push("/masters/product/new")}
          type="button"
        >
          <Icon iconName="add" size="24px" className="cursor-pointer" button />
        </Button>
      </FloatMenu>
    </>
  );
};

export default Product;
