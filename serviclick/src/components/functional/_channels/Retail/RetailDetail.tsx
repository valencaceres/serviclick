import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import RetailLogo from "./RetailLogo";
import RetailForm from "./RetailForm";
import RetailProducts from "./RetailProducts";
import RetailUsers from "./RetailUsers";
import RetailProductsItem from "./RetailProductsItem";
import RetailUsersItem from "./RetailUsersItem";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ModalWindow from "../../../ui/ModalWindow";
import { Modal } from "../../../ui/Modal";
import Icon from "../../../ui/Icon";
import ModalWarning from "../../../ui/ModalWarning";

import { useRetail } from "../../../../hooks";

import styles from "./Retail.module.scss";
import { useDistrict } from "~/store/hooks";
import EditUser from "./RetailEditAgent";
import RemoveAgent from "./RetailRemoveAgent";

interface IFormFieldString {
  value: string;
  isValid: boolean;
}

interface IFormFieldNumber {
  value: number;
  isValid: boolean;
}

interface IRetailForm {
  rut: IFormFieldString;
  name: IFormFieldString;
  legalRepresentative: IFormFieldString;
  line: IFormFieldString;
  fantasyName: IFormFieldString;
  address: IFormFieldString;
  district: IFormFieldString;
  email: IFormFieldString;
  phone: IFormFieldString;
  logo: IFormFieldString;
}

interface IRetailProductForm {
  product_id: IFormFieldString;
  name: IFormFieldString;
  baseprice: IFormFieldNumber;
  price: IFormFieldNumber;
  commisionTypeCode: IFormFieldString;
  value: IFormFieldNumber;
  currency: IFormFieldString;
  discount: {
    type: IFormFieldString;
    percent: IFormFieldNumber;
    cicles: IFormFieldNumber;
  };
}

interface IRetailUserForm {
  rut: IFormFieldString;
  name: IFormFieldString;
  paternalLastName: IFormFieldString;
  maternalLastName: IFormFieldString;
  email: IFormFieldString;
  profileCode: IFormFieldString;
  profileName: IFormFieldString;
}

const RetailDetail = () => {
  const router = useRouter();

  const {
    retail,
    setRetail,
    loading: retailLoading,
    createRetail,
    addProduct,
    removeProduct,
  } = useRetail();
  const { getDistricts } = useDistrict();

  const initialDataRetailForm: IRetailForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    legalRepresentative: {
      value: "",
      isValid: true,
    },
    line: { value: "", isValid: true },
    fantasyName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    logo: { value: "", isValid: true },
  };

  const initialDataRetailProductForm: IRetailProductForm = {
    product_id: { value: "", isValid: false },
    name: { value: "", isValid: true },
    baseprice: { value: 0, isValid: false },
    price: { value: 0, isValid: false },
    commisionTypeCode: {
      value: "",
      isValid: false,
    },
    value: { value: 0, isValid: false },
    currency: { value: "", isValid: false },
    discount: {
      type: { value: "", isValid: true },
      percent: { value: 0, isValid: true },
      cicles: { value: 0, isValid: true },
    },
  };

  const initialDataRetailUserForm: IRetailUserForm = {
    rut: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    email: { value: "", isValid: false },
    profileCode: { value: "", isValid: false },
    profileName: { value: "", isValid: false },
  };

  const [retailForm, setRetailForm] = useState<IRetailForm>(
    initialDataRetailForm
  );
  const [retailProductForm, setRetailProductForm] =
    useState<IRetailProductForm>(initialDataRetailProductForm);
  const [retailUserForm, setRetailUserForm] = useState<IRetailUserForm>(
    initialDataRetailUserForm
  );
  const [showModalProducts, setShowModalProducts] = useState(false);
  const [showModalUsers, setShowModalUsers] = useState(false);
  const [userToRemove, setUserToRemove] = useState<any>();
  const [showAlertUsers, setShowAlertUsers] = useState(false);
  const [isDisabledRetailForm, setIsDisabledRetailForm] = useState(true);
  const [productToDelete, setProductToDelete] = useState({ id: "", name: "" });
  const [showWarningDeleteProduct, setShowWarningDeleteProduct] =
    useState(false);

  const setClosedWarningDeleteProduct = () => {
    setShowWarningDeleteProduct(false);
  };

  const handleClickEditForm = () => {
    if (isDisabledRetailForm) {
      setIsDisabledRetailForm(false);
      return;
    }
    createRetail(retail);
  };
  const handleClickRemoveAgent = (item: any) => {
    setUserToRemove(item);
    setShowAlertUsers(true);
  };

  const handleClickAddNewProduct = () => {
    setRetailProductForm(initialDataRetailProductForm);
    setShowModalProducts(true);
  };

  const handleClickEditProduct = (item: any) => {
    setRetailProductForm({
      product_id: { value: item.product_id, isValid: true },
      name: { value: item.name, isValid: true },
      baseprice: { value: item.baseprice, isValid: true },
      price: { value: item.price, isValid: true },
      commisionTypeCode: {
        value: item.commisionTypeCode,
        isValid: true,
      },
      value: { value: item.value, isValid: true },
      currency: { value: item.currency, isValid: true },
      discount: {
        type: { value: item.discount.type, isValid: true },
        percent: { value: item.discount.percent, isValid: true },
        cicles: { value: item.discount.cicles, isValid: true },
      },
    });
    setShowModalProducts(true);
  };

  const handleClickDeleteProduct = (item: any) => {
    setProductToDelete({ id: item.product_id, name: item.name });
    setShowWarningDeleteProduct(true);
  };

  const handleClickDeleteProductOK = () => {
    removeProduct(retail.id, productToDelete.id);
    setShowWarningDeleteProduct(false);
  };

  const handleClickAddNewUser = () => {
    setRetailUserForm(initialDataRetailUserForm);
    setShowModalUsers(true);
  };

  const handleClickEditUser = (item: any) => {
    setRetailUserForm({
      rut: { value: item.rut, isValid: true },
      name: { value: item.name, isValid: true },
      paternalLastName: { value: item.paternalLastName, isValid: true },
      maternalLastName: { value: item.maternalLastName, isValid: true },
      email: { value: item.email, isValid: true },
      profileCode: { value: item.profileCode, isValid: true },
      profileName: { value: item.profileName, isValid: true },
    });
    setShowModalUsers(true);
  };

  const handleClickDeleteUser = (item: any) => {
    setRetailUserForm(initialDataRetailUserForm);
    setRetail({
      ...retail,
      users: [...retail.users.filter((user: any) => user.rut !== item.rut)],
    });
  };

  const handleClickSaveProduct = () => {
    addProduct(
      retail.id,
      {
        product_id: retailProductForm.product_id.value,
        name: retailProductForm.name.value,
        price: {
          base: retailProductForm.baseprice.value,
          customer: 0,
          company: retailProductForm.price.value,
        },
        currency: retailProductForm.currency.value,
        discount: {
          type:
            retailProductForm.discount.type.value == ""
              ? "n"
              : retailProductForm.discount.type.value,
          percent: retailProductForm.discount.percent.value,
          cicles: retailProductForm.discount.cicles.value,
        },
      },
      1
    );
  };

  const handleClickSaveUser = () => {
    setRetail({
      ...retail,
      users: [
        ...retail.users.filter(
          (user: any) => user.rut !== retailUserForm.rut.value
        ),
        {
          rut: retailUserForm.rut.value,
          name: retailUserForm.name.value,
          paternalLastName: retailUserForm.paternalLastName.value,
          maternalLastName: retailUserForm.maternalLastName.value,
          email: retailUserForm.email.value,
          profileCode: retailUserForm.profileCode.value,
          profileName: retailUserForm.profileName.value,
        },
      ],
    });
  };

  const handleClickSendCredentials = () => {};

  useEffect(() => {
    if (retail.rut === "") {
      setRetailForm(initialDataRetailForm);
    }
  }, [router]);

  useEffect(() => {
    getDistricts();
  }, []);

  return (
    <Fragment>
      <ContentRow gap="20px">
        <ContentCell gap="5px">
          <RetailLogo />
          <RetailForm
            isDisabledRetailForm={isDisabledRetailForm}
            retailForm={retailForm}
            setRetailForm={setRetailForm}
            editForm={handleClickEditForm}
            setIsDisabledRetailForm={setIsDisabledRetailForm}
          />
        </ContentCell>
        <ContentCell gap="20px">
          <RetailProducts
            addNewProduct={handleClickAddNewProduct}
            editProduct={handleClickEditProduct}
            deleteProduct={handleClickDeleteProduct}
            setRetailProductForm={setRetailProductForm}
          />
          <RetailUsers
            addNewUser={handleClickAddNewUser}
            editUser={handleClickEditUser}
            deleteUser={handleClickDeleteUser}
            setRetailUserForm={setRetailUserForm}
            handleClickRemoveAgent={handleClickRemoveAgent}
          />
        </ContentCell>
      </ContentRow>
      <ModalWindow
        showModal={showModalProducts}
        title="Producto"
        setClosed={() => setShowModalProducts(false)}
      >
        <RetailProductsItem
          saveProduct={handleClickSaveProduct}
          retailProductForm={retailProductForm}
          setRetailProductForm={setRetailProductForm}
          setShowModal={setShowModalProducts}
        />
      </ModalWindow>
      <EditUser
        isEdit={false}
        setOpenDialog={setShowModalUsers}
        openDialog={showModalUsers}
      />
      <RemoveAgent
        user={userToRemove}
        isOpen={showAlertUsers}
        setIsOpen={setShowAlertUsers}
      />
      <Modal showModal={retailLoading}>
        <div className={styles.message}>
          <Icon iconName="refresh" />
          Por favor espere
        </div>
      </Modal>
      <ModalWarning
        showModal={showWarningDeleteProduct}
        title="Eliminación de Producto asociado a Retail"
        message={`Está seguro de eliminar el producto ${productToDelete.name}`}
        setClosed={setClosedWarningDeleteProduct}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDeleteProduct },
          {
            text: "Si",
            function: () => handleClickDeleteProductOK(),
          },
        ]}
      />
    </Fragment>
  );
};

export default RetailDetail;
