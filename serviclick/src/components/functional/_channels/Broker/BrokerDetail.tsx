import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import BrokerLogo from "./BrokerLogo";
import BrokerForm from "./BrokerForm";
import BrokerProducts from "./BrokerProducts";
import BrokerUsers from "./BrokerUsers";
import BrokerProductsItem from "./BrokerProductsItem";
import BrokerUsersItem from "./BrokerUsersItem";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ModalWindow from "../../../ui/ModalWindow";
import { Modal } from "../../../ui/Modal";
import Icon from "../../../ui/Icon";
import ModalWarning from "../../../ui/ModalWarning";
import RemoveAgent from "./BrokerRemoveAgent";
import { useBroker } from "../../../../hooks";
import { useDistrict } from "~/store/hooks";
import styles from "./Broker.module.scss";
import EditUser from "./BrokerUsersItem";

interface IFormFieldString {
  value: string;
  isValid: boolean;
}

interface IFormFieldNumber {
  value: number;
  isValid: boolean;
}

interface IBrokerForm {
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

interface IBrokerProductForm {
  product_id: IFormFieldString;
  name: IFormFieldString;
  price: {
    base: IFormFieldNumber;
    customer: IFormFieldNumber;
    company: IFormFieldNumber;
    yearly: IFormFieldNumber;
  };
  commisionTypeCode: IFormFieldString;
  value: IFormFieldNumber;
  currency: IFormFieldString;
  discount: {
    type: IFormFieldString;
    percent: IFormFieldNumber;
    cicles: IFormFieldNumber;
  };
  pdfbase64: any;
}

interface IBrokerUserForm {
  rut: IFormFieldString;
  name: IFormFieldString;
  paternalLastName: IFormFieldString;
  maternalLastName: IFormFieldString;
  email: IFormFieldString;
  profileCode: IFormFieldString;
  profileName: IFormFieldString;
}

const BrokerDetail = () => {
  const router = useRouter();

  const {
    broker,
    setBroker,
    loading,
    createBroker,
    addProduct,
    removeProduct,
  } = useBroker();

  const initialDataBrokerForm: IBrokerForm = {
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

  const initialDataBrokerProductForm: IBrokerProductForm = {
    product_id: { value: "", isValid: false },
    name: { value: "", isValid: true },
    price: {
      base: { value: 0, isValid: false },
      customer: { value: 0, isValid: false },
      company: { value: 0, isValid: false },
      yearly: { value: 0, isValid: false },
    },
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
    pdfbase64: "",
  };

  const initialDataBrokerUserForm: IBrokerUserForm = {
    rut: { value: "", isValid: false },
    name: { value: "", isValid: false },
    paternalLastName: { value: "", isValid: false },
    maternalLastName: { value: "", isValid: false },
    email: { value: "", isValid: false },
    profileCode: { value: "", isValid: false },
    profileName: { value: "", isValid: false },
  };

  const [brokerForm, setBrokerForm] = useState<IBrokerForm>(
    initialDataBrokerForm
  );
  const [brokerProductForm, setBrokerProductForm] =
    useState<IBrokerProductForm>(initialDataBrokerProductForm);
  const [brokerUserForm, setBrokerUserForm] = useState<IBrokerUserForm>(
    initialDataBrokerUserForm
  );
  const [showModalProducts, setShowModalProducts] = useState(false);
  const [showModalUsers, setShowModalUsers] = useState(false);
  const [userToRemove, setUserToRemove] = useState<any>();
  const [showAlertUsers, setShowAlertUsers] = useState(false);
  const [isDisabledBrokerForm, setIsDisabledBrokerForm] = useState(true);
  const [productToDelete, setProductToDelete] = useState({ id: "", name: "" });
  const [showWarningDeleteProduct, setShowWarningDeleteProduct] =
    useState(false);
  const { getDistricts } = useDistrict();
  const setClosedWarningDeleteProduct = () => {
    setShowWarningDeleteProduct(false);
  };

  const handleClickEditForm = () => {
    if (isDisabledBrokerForm) {
      setIsDisabledBrokerForm(false);
      return;
    }
    createBroker(broker);
    setIsDisabledBrokerForm(true);
  };

  const handleClickAddNewProduct = () => {
    setBrokerProductForm(initialDataBrokerProductForm);
    setShowModalProducts(true);
  };

  const handleClickEditProduct = (item: any) => {
    setBrokerProductForm({
      product_id: { value: item.product_id, isValid: true },
      name: { value: item.name, isValid: true },
      price: {
        base: { value: item.price.base, isValid: true },
        customer: { value: item.price.customer, isValid: true },
        company: { value: item.price.company, isValid: true },
        yearly: { value: item.price.yearly, isValid: true },
      },
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
      pdfbase64: item.pdfbase64,
    });
    setShowModalProducts(true);
  };

  const handleClickDeleteProduct = (item: any) => {
    setProductToDelete({ id: item.product_id, name: item.name });
    setShowWarningDeleteProduct(true);
  };

  const handleClickDeleteProductOK = () => {
    removeProduct(broker.id, productToDelete.id);
    setShowWarningDeleteProduct(false);
  };

  const handleClickAddNewUser = () => {
    setBrokerUserForm(initialDataBrokerUserForm);
    setShowModalUsers(true);
  };
  const handleClickRemoveAgent = (item: any) => {
    setUserToRemove(item);
    setShowAlertUsers(true);
  };

  const handleClickEditUser = (item: any) => {
    setBrokerUserForm({
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
    setBrokerUserForm(initialDataBrokerUserForm);
    setBroker({
      ...broker,
      users: [...broker.users.filter((user: any) => user.rut !== item.rut)],
    });
  };

  const handleClickSaveProduct = () => {
    const file = brokerProductForm.pdfbase64;
    let base64Pdf = "";

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        base64Pdf = reader.result?.toString().split(",")[1] ?? "";
        addProduct(broker.id, {
          product_id: brokerProductForm.product_id.value,
          name: brokerProductForm.name.value,
          price: {
            base: brokerProductForm.price.base.value,
            customer: brokerProductForm.price.customer.value,
            company: brokerProductForm.price.company.value,
            yearly: brokerProductForm.price.yearly.value,
          },
          commisionTypeCode: brokerProductForm.commisionTypeCode.value,
          value: brokerProductForm.value.value,
          currency: "P",
          discount: {
            type:
              brokerProductForm.discount.type.value == ""
                ? "n"
                : brokerProductForm.discount.type.value,
            percent: brokerProductForm.discount.percent.value,
            cicles: brokerProductForm.discount.cicles.value,
          },
          pdfbase64: base64Pdf || "",
        });
      };

      reader.readAsDataURL(file);
    } else {
      addProduct(broker.id, {
        product_id: brokerProductForm.product_id.value,
        name: brokerProductForm.name.value,
        price: {
          base: brokerProductForm.price.base.value,
          customer: brokerProductForm.price.customer.value,
          company: brokerProductForm.price.company.value,
          yearly: brokerProductForm.price.yearly.value,
        },
        commisionTypeCode: brokerProductForm.commisionTypeCode.value,
        value: brokerProductForm.value.value,
        currency: "P",
        discount: {
          type:
            brokerProductForm.discount.type.value == ""
              ? "n"
              : brokerProductForm.discount.type.value,
          percent: brokerProductForm.discount.percent.value,
          cicles: brokerProductForm.discount.cicles.value,
        },
        pdfbase64: "",
      });
    }
  };
  const handleClickSaveUser = () => {
    setBroker({
      ...broker,
      users: [
        ...broker.users.filter(
          (user: any) => user.rut !== brokerUserForm.rut.value
        ),
        {
          rut: brokerUserForm.rut.value,
          name: brokerUserForm.name.value,
          paternalLastName: brokerUserForm.paternalLastName.value,
          maternalLastName: brokerUserForm.maternalLastName.value,
          email: brokerUserForm.email.value,
          profileCode: brokerUserForm.profileCode.value,
          profileName: brokerUserForm.profileName.value,
        },
      ],
    });
  };

  const handleClickSendCredentials = () => {};

  useEffect(() => {
    if (broker.rut === "") {
      setBrokerForm(initialDataBrokerForm);
    }
  }, [router]);

  useEffect(() => {
    getDistricts();
  }, []);

  return (
    <Fragment>
      <ContentRow gap="20px">
        <ContentCell gap="5px">
          <BrokerLogo />
          <BrokerForm
            isDisabledBrokerForm={isDisabledBrokerForm}
            brokerForm={brokerForm}
            setBrokerForm={setBrokerForm}
            editForm={handleClickEditForm}
            setIsDisabledBrokerForm={setIsDisabledBrokerForm}
          />
        </ContentCell>
        <ContentCell gap="20px">
          <BrokerProducts
            addNewProduct={handleClickAddNewProduct}
            editProduct={handleClickEditProduct}
            deleteProduct={handleClickDeleteProduct}
            setBrokerProductForm={setBrokerProductForm}
          />
          <BrokerUsers
            addNewUser={handleClickAddNewUser}
            editUser={handleClickEditUser}
            deleteUser={handleClickDeleteUser}
            setBrokerUserForm={setBrokerUserForm}
            handleClickRemoveAgent={handleClickRemoveAgent}
          />
        </ContentCell>
      </ContentRow>
      <ModalWindow
        showModal={showModalProducts}
        title="Producto"
        setClosed={() => setShowModalProducts(false)}
      >
        <BrokerProductsItem
          saveProduct={handleClickSaveProduct}
          brokerProductForm={brokerProductForm}
          setBrokerProductForm={setBrokerProductForm}
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

      <Modal showModal={loading}>
        <div className={styles.message}>
          <Icon iconName="refresh" />
          Por favor espere
        </div>
      </Modal>
      <ModalWarning
        showModal={showWarningDeleteProduct}
        title="Eliminación de Producto asociado a Broker"
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

export default BrokerDetail;
