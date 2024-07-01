import React from "react";

import { useRouter } from "next/router";

import styles from "./Detail.module.scss";
import {
  TableHeader,
  TableCell,
  TableTitle,
} from "@/components/ui/Table/Table";
import Conditions from "@/components/ui/Conditions/Conditions";
import Button from "@/components/ui/Button/Button";
import Assistance from "@/components/ui/Assistance/Assistance";
import Discount from "@/components/ui/Discount/Discount";
import Price from "@/components/ui/Price/Price";
import Beneficiary from "@/components/ui/Beneficiary/Beneficiary";
import { ContentCol, ContentRow } from "@/components/layout/Content";
// import { assistanceData } from "@/data/assistance";
import { Text, NumberText } from "@/components/ui/Text/Text";
import { productData } from "@/data/product";

const tableHeader = [
  {
    text: "SERVICIO",
  },
  {
    text: "LÍMITE",
  },
  {
    text: "MAX. EVENTOS AL AÑO",
  },
  {
    text: "CARENCIA",
  },
];

const Detail = () => {
  const router = useRouter();
  const product = productData.find(
    (product) => product.id === router.query.prod
  );
  return (
    <>
      <div
        style={{ height: "100px", backgroundColor: "#29abe2", width: "100%" }}
      ></div>
      {product && (
        <ContentCol paddingTop="20px" gap="30px" paddingBottom="90px">
          <ContentRow gap="20px" alignItems="center">
            <div className={styles.border}></div>
            <Text
              text={product.name}
              fontFamily="Inter"
              fontSize="32px"
              fontWeight={700}
              color="#03495c"
            />
            <NumberText
              text={product.basePrice}
              fontFamily="Inter"
              fontSize="20px"
              fontWeight={800}
              color="#5C5C5C"
              textDecoration="line-through"
            />
            <Price text="$12.950" />
            <Discount text="20%" />
            <Beneficiary text="$3.590  (cada carga)" />
          </ContentRow>
          <ContentRow width="1200px" justifyContent="center" gap="50px">
            {product.assistances.map((assistance, index) => (
              <Assistance
                key={index}
                text={assistance.name}
                img={`/img/assistance/${assistance.id}.png`}
              />
            ))}
          </ContentRow>

          <ContentCol width="1200px" gap="5px">
            <ContentRow width="100%">
              {tableHeader.map((title, index) => (
                <TableHeader key={index} {...title} />
              ))}
            </ContentRow>

            <ContentCol width="100%">
              {product && product.assistances.length > 0 && (
                <TableTitle text={product.assistances[0].section} />
              )}
            </ContentCol>

            <ContentRow width="1200px">
              <ContentCol width="100%">
                {product &&
                  product.assistances.map((assistance, assistanceIndex) => (
                    <TableCell
                      alignLeft={true}
                      key={assistanceIndex}
                      text={assistance.name}
                    />
                  ))}
              </ContentCol>
              <ContentCol width="100%">
                {product &&
                  product.assistances.map((assistance, assistanceIndex) => (
                    <TableCell
                      key={assistanceIndex}
                      text={`${assistance.maximum} hasta ${assistance.amount} UF`}
                    />
                  ))}
              </ContentCol>
              <ContentCol width="100%">
                {product &&
                  product.assistances.map((assistance, assistanceIndex) => (
                    <TableCell
                      key={assistanceIndex}
                      text={`${assistance.events} Eventos`}
                    />
                  ))}
              </ContentCol>
              <ContentCol width="100%">
                {product &&
                  product.assistances.map((assistance, assistanceIndex) => (
                    <TableCell
                      key={assistanceIndex}
                      text={`${assistance.lack} Días`}
                    />
                  ))}
              </ContentCol>
            </ContentRow>
            <ContentRow
              width="100%"
              justifyContent="flex-start"
              paddingTop="20px"
            >
              <Text
                text="Carencia de 15 días"
                fontFamily="Inter"
                fontSize="24px"
                fontWeight={400}
                color="#03495C"
              />
            </ContentRow>
          </ContentCol>
          <Button text="¡LO QUIERO!" link="" />
          <Conditions />
        </ContentCol>
      )}
    </>
  );
};

export default Detail;
