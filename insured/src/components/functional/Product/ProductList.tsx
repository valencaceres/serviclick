import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import { useInsured } from "../../../zustand/hooks";

import Tooltip from "../../ui/Tooltip";
import Icon from "../../ui/Icon";

import styles from "./Product.module.scss";

type ProductT = {
  id: string;
  lead_id: string;
  family_icon: string;
  family_name: string;
  name: string;
  price: number;
  frequency_code: string;
  numberBeneficiaries: number;
};

type LeadT = {
  lead_id: string;
  customer_id: string;
  company_id: string;
  subscription_id: string;
  products: ProductT[];
};

const ProductList = () => {
  const router = useRouter();

  const { insuredProfile } = useInsured();
  const { products } = insuredProfile;

  const [showTooltip, setShowTooltip] = useState(true);

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickOption = (product: any) => {
    router.push(`/product?id=${product.id}`);
  };
  return (
    <div className={styles.products}>
      <div className={styles.menu}>
        {products.map((product, idx: number) => (
          <div className="relative">
            <button
              className={styles.option}
              key={idx}
              onClick={() => handleClickOption(product)}
            >
              {product.name}
            </button>
            {product.collection[0].balance > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                Adeudado: {product.collection[0].balance}
              </span>
            )}
          </div>
        ))}
      </div>

      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Mediante esta opción podrás revisar la información de los productos
          que has contratado con nosotros, su cobertura, límites, cantidad de
          eventos, etc.
          <br />
          <br />
          Debes seleccionar el producto que quieres ver.
        </div>
      </Tooltip>
    </div>
  );
};

export default ProductList;
