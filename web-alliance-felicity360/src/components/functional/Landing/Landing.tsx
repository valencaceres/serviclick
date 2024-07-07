import React, {useState, useEffect} from "react";

import Paragraph from "@/components/ui/Paragraph/Paragraph";
import Card from "@/components/ui/Card/Card";
import Benefit from "@/components/ui/Benefit/Benefit";
import Holding from "@/components/ui/Holding/Holding";
import Exclusive from "@/components/ui/Exclusive/Exclusive";
import WallpaperVideo from "@/components/ui/WallpaperVideo/WallpaperVideo";

import { ContentCol, ContentRow } from "@/components/layout/Content";

import { useProduct } from "@/store/hooks";
import { IProductsDetails } from "@/interfaces/product";

import { productData } from "@/data/product";
import { content, wordsWithStyles } from "@/data/landing";
import { benefitData } from "@/data/benefit";

const Landing = () => { 
  const [products, setProducts] = useState<IProductsDetails[]>([])
  const {productList, getProductsById} = useProduct()


  useEffect(() => {
    // Extraer todos los productos de cada item en productList
    const extractedProducts = productList.flatMap(product => product.products);
    setProducts(extractedProducts);
  }, [productList]);

  return (
    <>
      <WallpaperVideo
        backgroundVideo="/video/banner.mp4"
        width={1240}
        height={500}
      >
        ASISTENCIAS QUE TE PROTEGEN <br /> EN TODO MOMENTO
      </WallpaperVideo>
      <ContentCol width="1200px" gap="50px" paddingBottom="50px">
        <Paragraph content={content} wordsWithStyles={wordsWithStyles} />

        <ContentCol gap="25px">
          {products.map((product, index) => (
            <Card
              key={index}
              title={product.name}
              paragraph={product.description}
              basePrice={product.basePrice}
              price={product.price}
              discountText={"20%"}
              beneficiaryPrice={product.beneficiary_price}
              buttonText={"Ver más"}
              buttonLink={`/detail/${product.id}`}
              img={product.id}
            />
          ))}
        </ContentCol>
        <Paragraph content="BENEFICIOS" />
        <ContentRow
          width="1200px"
          flexWrap="wrap"
          justifyContent="center"
          gap="30px"
        >
          {benefitData.map((benefit, index) => (
            <Benefit key={index} text={benefit.text} img={benefit.image} />
          ))}
        </ContentRow>

        <Holding />
        <Exclusive />
      </ContentCol>
    </>
  );
};
export default Landing;
