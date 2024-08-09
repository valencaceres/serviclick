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
  if (amount === 0) {
    description += ` ${events} eventos en el año`;
  } else {
    description += `, ${events} eventos en el año`;
  }

  if (events === 0) {
    description = "Ilimitado";
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

  const getColorByIndex = (
    index: number,
    colors: ColorData
  ): string | undefined => {
    const colorKey = `color${index + 1}` as keyof ColorData;
    return colors[colorKey];
  };

  const handleDownload = async (base64: string, name: string) => {
    if (base64) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className={styles.detailProduct} id="asistencias">
        {productList
          .sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          })
          .map((product, index) => {
            const buttonColor = getColorByIndex(index, data);
            const backgroundColor = getColorByIndex(index, data);

            return (
              <Card
                key={product.id}
                imageSrc={`/img/cards/${product.id}.png`}
                planName={product.name}
                currentPrice={product.price}
                originalPrice={product.baseprice}
                discount={`30%`}
                individualPlanText={
                  product.id === "3fcc493c-e3fd-4a06-b78b-982f3c1a632e"
                    ? "Consulta por plan individual"
                    : ""
                }
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
                    generatePdf: () => {
                      handleDownload(product.base64, product.name);
                    },
                  },
                ]}
              />
            );
          })}
      </div>

      <Slider>
        {productList.map((product, index) => {
          const buttonColor = getColorByIndex(index, data);
          const backgroundColor = getColorByIndex(index + 1, data);

          return (
            <div key={product.id} className={styles.sliderItem}>
              <Card
                imageSrc={`/img/cards/${product.id}.png`}
                planName={product.name}
                currentPrice={product.price}
                originalPrice={product.baseprice}
                discount={`${product.discount_percent}%`}
                individualPlanText="Consulta por plan individual"
                buttonText="¡Lo quiero!"
                buttonColor={buttonColor}
                backgroundColor={backgroundColor}
                /*                 buttonURLCard={product.buttonURL} */
                benefits={product.assistances.map((assistance) => ({
                  title: assistance.name,
                  /*                   smallText: assistance.small_description, */
                  description: formatDescription(assistance),
                  iconSrc: "/img/cards/check.png",
                }))}
                textCard={[
                  {
                    title: "Salud Integral",
                    paragraph: product.hiring_conditions,
                    buttonText: "Descargar PDF",
                    /*                     buttonURL: product.pdf_url, */
                    generatePdf: () => {
                      handleDownload(product.productplan_id, product.name);
                    },
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
