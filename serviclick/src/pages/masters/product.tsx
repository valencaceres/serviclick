import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import {
  ProductDetail,
  ProductList,
} from "../../components/functional/_masters/Product";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useFamily, useProduct, useAssistance } from "../../hooks";
import { useUser } from "~/store/hooks";

const Product = () => {
  const router = useRouter();
  const {user} = useUser()

  if (typeof window !== 'undefined') {
    if (!user.email) {
      router.push('/')
    }
  }

  const { setTitleUI } = useUI();
  const { listAll } = useFamily();
  const {
    createProduct,
    deleteProductById,
    resetProduct,
    getAllProducts,
    getProductFamilies,
    getOnlyProductById,
    product,
    productLoading,
  } = useProduct();
  const { getAllAssistances } = useAssistance();

  const [enableSave, setEnableSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
    listAll();
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
    setIsSaving(true);
    createProduct(
      product.id,
      product.family_id,
      product.name,
      product.cost,
      product.isSubject,
      product.frequency,
      product.term,
      product.beneficiaries,
      product.currency,
      product.dueDay,
      product.minInsuredCompanyPrice,
      product.title,
      product.subTitle,
      product.alias,
      product.promotional,
      product.description,
      product.territorialScope,
      product.hiringConditions,
      product.assistances
    );
  };

  useEffect(() => {
    setTitleUI("Producto");
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
    getProductFamilies();
    getAllAssistances();
  }, []);

  useEffect(() => {
    resetProduct();
    if (router.query.id !== "" && router.query.id !== "new") {
      router.query.id && getOnlyProductById(router.query.id?.toString());
    }
  }, [router.query]);

  useEffect(() => {
    if (isSaving === true && productLoading === false) {
      getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
      setIsSaving(false);
    }
  }, [isSaving, productLoading]);

  return router.isReady && router.query.id ? (
    <Fragment>
      <ProductDetail
        setEnableSave={setEnableSave}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            handleClickSave();
          }}
          disabled={!enableSave}
          loading={productLoading}
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
