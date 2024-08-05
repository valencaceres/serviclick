import React from "react";
import Card from "@/components/ui/Card";
import { productData, Assistance } from "@/components/data/product";
import styles from "./DetailProduct.module.scss";
import Slider from "@/components/ui/Slider/Slider";
import { data } from "@/components/data/color";

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

interface ColorData {
  color1: string;
  color2: string;
  color3: string;
}

const DetailProduct = () => {
  const { productList } = useProduct();

  const getColorByIndex = (index: number, colors: ColorData): string | undefined => {
    const colorKey = `color${index + 1}` as keyof ColorData;
    return colors[colorKey];
  };

  return (
    <>
      <div className={styles.detailProduct} id="asistencias">
        {productList.map((product, index) => {
          const buttonColor = getColorByIndex(index, data);
          const backgroundColor = getColorByIndex(index, data); // Ajusta si es necesario
          
          return (
            <Card
              key={product.id}
              imageSrc={`/img/cards/${product.id}.png`}
              planName={product.name}
              currentPrice={product.price}
              originalPrice={product.baseprice}
              discount={`${product.discount_percent}%`}
              individualPlanText="Consulta por plan individual"
              buttonText="¡Lo quiero!"
              buttonColor={buttonColor}
              backgroundColor={backgroundColor}
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
                },
              ]}
            />
          );
        })}
      </div>

      <Slider>
        {productData.map((product, index) => {
          const buttonColor = getColorByIndex(index, data);
          const backgroundColor = getColorByIndex(index + 1, data); // Ajusta si es necesario
          
          return (
            <div key={product.id} className={styles.sliderItem}>
              <Card
                imageSrc={`/img/cards/${product.id}.png`}
                planName={product.name}
                currentPrice={product.price}
                originalPrice={product.basePrice}
                discount={`${product.discount}%`}
                individualPlanText="Consulta por plan individual"
                buttonText="¡Lo quiero!"
                buttonColor={buttonColor}
                backgroundColor={backgroundColor}
                buttonURLCard={product.buttonURL}
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
          );
        })}
      </Slider>
    </>
  );
};

export default DetailProduct;
