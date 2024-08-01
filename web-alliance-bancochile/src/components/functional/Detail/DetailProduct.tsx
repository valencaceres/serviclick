import React from "react";
import Card from "@/components/ui/Card";
import { productData, Assistance } from "@/components/data/product";
import styles from "./DetailProduct.module.scss";
import Slider from "@/components/ui/Slider/Slider";

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

  description += `, ${events} eventos en el año`;

  return description;
}

const DetailProduct = () => {
  return (
    <>
      <div className={styles.detailProduct} id="asistencias">
        {productData.map((product) => (
          <Card
            key={product.id}
            imageSrc={`/img/cards/${product.id}.png`}
            planName={product.name}
            currentPrice={product.price}
            originalPrice={product.basePrice}
            discount={`${product.discount}%`}
            individualPlanText="Consulta por plan individual"
            buttonText="¡Lo quiero!"
            buttonColor={product.color}
            backgroundColor={product.color}
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
