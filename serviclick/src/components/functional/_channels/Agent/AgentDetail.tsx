import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import AgentForm from "./AgentForm";
import AgentProducts from "./AgentProducts";
import AgentProductsItem from "./AgentProductsItem.tsx";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ModalWindow from "../../../ui/ModalWindow";
import { Modal } from "../../../ui/Modal";
import Icon from "../../../ui/Icon";
import ModalWarning from "../../../ui/ModalWarning";
import { useBroker } from "../../../../hooks";
import { useDistrict } from "~/store/hooks";
import useAgent from "~/store/hooks/useAgent";
import styles from "./Agent.module.scss";

interface IFormFieldString {
  value: string;
  isValid: boolean;
}

interface IFormFieldNumber {
  value: number;
  isValid: boolean;
}

interface IAgentForm {
  name: IFormFieldString;

  fantasyName: IFormFieldString;
}

interface IAgentProductForm {
  product_id: IFormFieldString;
  name: IFormFieldString;
  price: {
    base: IFormFieldNumber;
    customer: IFormFieldNumber;
    company: IFormFieldNumber;
    yearly: IFormFieldNumber;
  };
  plans: {
    customer_plan_id: number;
    yearly_plan_id: number;
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
  beneficiary_price: IFormFieldNumber;
}

const AgentDetail = () => {
  const router = useRouter();

  const { broker, setBroker, createBroker, removeProduct } = useBroker();
  const {
    agent,
    isLoading: loading,
    setAgent,
    getAgentById,
    resetAgent,
    addProduct,
  } = useAgent();

  const initialDataAgentForm: IAgentForm = {
    name: { value: "", isValid: true },
    fantasyName: { value: "", isValid: true },
  };

  const initialdataAgentProductForm: IAgentProductForm = {
    product_id: { value: "", isValid: false },
    name: { value: "", isValid: true },
    price: {
      base: { value: 0, isValid: false },
      customer: { value: 0, isValid: false },
      company: { value: 0, isValid: false },
      yearly: { value: 0, isValid: false },
    },
    plans: {
      customer_plan_id: 0,
      yearly_plan_id: 0,
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
    beneficiary_price: { value: 0, isValid: false },
  };

  const [agentForm, setAgentForm] = useState<IAgentForm>(initialDataAgentForm);
  const [agentProductForm, setAgentProductForm] = useState<IAgentProductForm>(
    initialdataAgentProductForm
  );
  const [showModalProducts, setShowModalProducts] = useState(false);
  const [isDisabledAgentForm, setIsDisabledAgentForm] = useState(true);
  const [productToDelete, setProductToDelete] = useState({ id: "", name: "" });
  const [productBeneficiaries, setProductBeneficiaries] = useState<number>(0);
  const [showWarningDeleteProduct, setShowWarningDeleteProduct] =
    useState(false);
  const setClosedWarningDeleteProduct = () => {
    setShowWarningDeleteProduct(false);
  };

  const handleClickEditForm = () => {
    if (isDisabledAgentForm) {
      setIsDisabledAgentForm(false);
      return;
    }
    createBroker(broker);
    setIsDisabledAgentForm(true);
  };

  const handleClickAddNewProduct = () => {
    setAgentProductForm(initialdataAgentProductForm);
    setShowModalProducts(true);
  };

  const handleClickEditProduct = (item: any) => {
    setAgentProductForm({
      product_id: { value: item.product_id, isValid: true },
      name: { value: item.name, isValid: true },
      price: {
        base: { value: item.price.base, isValid: true },
        customer: { value: item.price.customer, isValid: true },
        company: { value: item.price.company, isValid: true },
        yearly: { value: item.price.yearly, isValid: true },
      },
      plans: {
        customer_plan_id: item.productPlan_id.customer,
        yearly_plan_id: item.productPlan_id.yearly,
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
      beneficiary_price: { value: item.beneficiary_price, isValid: true },
    });
    setProductBeneficiaries(item.beneficiaries);
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

  const handleClickSaveProduct = () => {
    const file = agentProductForm.pdfbase64;
    let base64Pdf = "";
    if (typeof file !== "string" && file) {
      if (file instanceof Blob) {
        const reader = new FileReader();

        reader.onloadend = () => {
          base64Pdf = reader.result?.toString().split(",")[1] ?? "";
          addProduct(agent.agent.id, {
            product_id: agentProductForm.product_id.value,
            name: agentProductForm.name.value,
            productPlan_id: {
              customer_plan_id: agentProductForm.plans.customer_plan_id,
              yearly_plan_id: agentProductForm.plans.yearly_plan_id,
            },
            price: {
              base: agentProductForm.price.base.value,
              customer: agentProductForm.price.customer.value,
              yearlyprice: agentProductForm.price.yearly.value,
              company: agentProductForm.price.company.value,
            },
            discount: {
              type:
                agentProductForm.discount.type.value == ""
                  ? "n"
                  : agentProductForm.discount.type.value,
              percent: agentProductForm.discount.percent.value,
              cicles: agentProductForm.discount.cicles.value,
            },
            pdfbase64: base64Pdf || "",
            beneficiary_price: agentProductForm.beneficiary_price.value,
            promotional: "n",
            beneficiaries: 0,
          });
        };

        reader.readAsDataURL(file);
      }
    } else {
      addProduct(agent.agent.id, {
        product_id: agentProductForm.product_id.value,
        name: agentProductForm.name.value,
        productPlan_id: {
          customer_plan_id: agentProductForm.plans.customer_plan_id,
          yearly_plan_id: agentProductForm.plans.yearly_plan_id,
        },
        price: {
          base: agentProductForm.price.base.value,
          customer: agentProductForm.price.customer.value,
          yearlyprice: agentProductForm.price.yearly.value,
          company: agentProductForm.price.company.value,
        },
        discount: {
          type:
            agentProductForm.discount.type.value == ""
              ? "n"
              : agentProductForm.discount.type.value,
          percent: agentProductForm.discount.percent.value,
          cicles: agentProductForm.discount.cicles.value,
        },
        pdfbase64: base64Pdf || "",
        beneficiary_price: agentProductForm.beneficiary_price.value,
        promotional: "n",
        beneficiaries: productBeneficiaries,
      });
    }
  };

  const handleClickSendCredentials = () => {};

  useEffect(() => {
    if (agent.agent.name === "") {
      setAgentForm(initialDataAgentForm);
    }
  }, [router]);

  return (
    <Fragment>
      <ContentCell gap="20px">
        <AgentForm
          isDisabledAgentForm={isDisabledAgentForm}
          agentForm={agentForm}
          setAgentForm={setAgentForm}
          editForm={handleClickEditForm}
          setIsDisabledAgentForm={setIsDisabledAgentForm}
        />
        <AgentProducts
          addNewProduct={handleClickAddNewProduct}
          editProduct={handleClickEditProduct}
          deleteProduct={handleClickDeleteProduct}
          setAgentProductForm={setAgentProductForm}
        />
      </ContentCell>
      <ModalWindow
        showModal={showModalProducts}
        title="Producto"
        setClosed={() => setShowModalProducts(false)}
      >
        <AgentProductsItem
          saveProduct={handleClickSaveProduct}
          agentProductForm={agentProductForm}
          setAgentProductForm={setAgentProductForm}
          setShowModal={setShowModalProducts}
          beneficiaries={productBeneficiaries}
        />
      </ModalWindow>

      <Modal showModal={loading}>
        <div className={styles.message}>
          <Icon iconName="refresh" />
          Por favor espere
        </div>
      </Modal>
      {/*   <ModalWarning
        showModal={showWarningDeleteProduct}
        title="Eliminación de Producto asociado a web"
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
      /> */}
    </Fragment>
  );
};

export default AgentDetail;
