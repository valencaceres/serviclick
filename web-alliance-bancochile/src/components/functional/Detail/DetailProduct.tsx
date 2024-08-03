import React from "react";
import Card from "@/components/ui/Card";
import { productData, Assistance } from "@/components/data/product";
import styles from "./DetailProduct.module.scss";
import Slider from "@/components/ui/Slider/Slider";

import config from "@/utils/config";

import { useProduct } from "@/store/hooks";

function formatDescription(assistance: Assistance) {

  const { amount, currency, maximum, events } = assistance;
  let description = "";

  if (maximum) {
    description += maximum;
    if (amount > 0) {
      description += " con tope de ";
    }
  }

  if (amount > 0) {
    if (currency === "P") {
      description += `$${amount.toLocaleString("es-CL")}`;
    } else if (currency === "U") {
      description += `${amount} UF`;
    }
  }
  if(amount === 0) {
    description += ` ${events} eventos en el año`;
  }else {
    description += `, ${events} eventos en el año`;
  }
  return description;
}

const DetailProduct = () => {
  const getColorById = (id: any, productData: any) => {
    const data = productData.find((item: any) => item.id === id);
    return data ? data.color : null; 
};

  const {productList} = useProduct()

  return (
    <>
      <div className={styles.detailProduct} id="asistencias">
        {productList.map((product) => (
          <Card
            key={product.id}
            imageSrc={`/img/cards/${product.id}.png`}
            planName={product.name}
            currentPrice={product.price}
            originalPrice={product.baseprice}
            discount={`${product.discount_percent}%`}
            individualPlanText="Consulta por plan individual"
            buttonText="¡Lo quiero!"
            buttonColor={getColorById(product.id, productData)}
            backgroundColor={getColorById(product.id, productData)}
            buttonURLCard={`${config.products}${product.productplan_id}`}
            benefits={product.assistances.map((assistance) => ({
              title: assistance.name,
              description: formatDescription(assistance),
              iconSrc: "/img/cards/check.png",
            }))}
            textCard={[
              {
                title: product.name,
                paragraph: product.hiring_conditions,
                buttonText: "Descargar PDF",
                /* buttonURL: product.pdf_url, */
              },
            ]}
          />
        ))}
      </div>

      <Slider>
        {productData.map((product) => (
          <div key={product.id} className={styles.sliderItem}>
            <Card
              imageSrc={`/img/cards/${product.id}.png`}
              planName={product.name}
              currentPrice={product.price}
              originalPrice={product.basePrice}
              discount={`${product.discount}%`}
              individualPlanText="Consulta por plan individual"
              buttonText="¡Lo quiero!"
              buttonColor={product.color}
              buttonURLCard={product.buttonURL}
              backgroundColor={product.color}
              benefits={product.assistances.map((assistance) => ({
                title: assistance.name,
                smallText: assistance.small_description,
                description: formatDescription(assistance),
                iconSrc: "/img/cards/check.png",
              }))}
              textCard={[
                {
                  title: "Salud Integral",
                  paragraph: product.hiring_conditions,
                  buttonText: "Descargar PDF",
                  buttonURL: product.pdf_url,
                },
              ]}
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default DetailProduct;
