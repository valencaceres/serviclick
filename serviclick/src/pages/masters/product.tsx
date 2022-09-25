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

  const { setTitleUI, setOptionsUI } = useUI();
  const { listAll: listAllFamilies } = useFamily();
  const { create, update, reset, listAll, getById, product } = useProduct();

  const [enableSave, setEnableSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll();
  };

  const handleClickBack = () => {
    reset();
    router.push("/masters/product");
  };

  const handleClickNew = () => {
    reset();
    router.push("/masters/product?id=new");
  };

  const addProduct = () => {
    reset();
    router.push("/masters/product?id=new");
  };

  const editProduct = (id: string) => {
    router.push(`/masters/product?id=${id}`);
  };

  const deleteProduct = () => {};

  const handleClickSave = () => {
    if (product.id === "") {
      create(
        product.family_id,
        product.name,
        product.cost,
        product.price,
        product.isSubject,
        product.frequency,
        product.term,
        product.beneficiaries,
        product.coverages,
        product.familyValues
      );
    } else {
      update(
        product.id,
        product.family_id,
        product.name,
        product.cost,
        product.price,
        product.isSubject,
        product.frequency,
        product.term,
        product.beneficiaries,
        product.coverages,
        product.familyValues
      );
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

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
