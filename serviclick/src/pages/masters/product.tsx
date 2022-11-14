import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
  ProductDetail,
  ProductList,
} from "../../components/functional/_masters/Product";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useFamily, useProduct } from "../../hooks";

const Product = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll: listAllFamilies } = useFamily();
  const {
    createProduct,
    updateProduct,
    deleteProductById,
    resetProduct,
    getAllProducts,
    getProductById,
    product,
  } = useProduct();

  const [enableSave, setEnableSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  };

  const handleClickBack = () => {
    resetProduct();
    router.push("/masters/product");
  };

  const handleClickNew = () => {
    resetProduct();
    router.push("/masters/product?id=new");
  };

  const addProduct = () => {
    resetProduct();
    router.push("/masters/product?id=new");
  };

  const editProduct = (id: string) => {
    router.push(`/masters/product?id=${id}`);
  };

  const deleteProduct = (id: string) => {
    deleteProductById(id);
  };

  const handleClickSave = () => {
    if (product.id === "") {
      createProduct(
        product.family_id,
        product.name,
        product.cost,
        product.isSubject,
        product.frequency,
        product.term,
        product.beneficiaries,
        product.minInsuredCompanyPrice,
        product.dueDay,
        product.coverages,
        product.familyValues,
        product.currency
      );
    } else {
      updateProduct(
        product.id,
        product.family_id,
        product.name,
        product.cost,
        product.isSubject,
        product.frequency,
        product.term,
        product.beneficiaries,
        product.minInsuredCompanyPrice,
        product.dueDay,
        product.coverages,
        product.familyValues,
        product.currency
      );
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setTitleUI("Producto");
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
    listAllFamilies();
  }, []);

  useEffect(() => {
    resetProduct();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id &&
        getProductById(
          router.query.id?.toString(),
          "020579a3-8461-45ec-994b-ad22ff8e3275"
        );
    }
  }, [router.query]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <ProductDetail setEnableSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            setIsLoading(true);
            handleClickSave();
          }}
          disabled={!enableSave}
          loading={isLoading}
        />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <ProductList
        addProduct={addProduct}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Product;
