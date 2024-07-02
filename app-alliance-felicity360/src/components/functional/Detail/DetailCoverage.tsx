import React from "react";

import { ContentCol, ContentRow } from "@/components/layout/Content";

import { Text } from "@/components/ui/Text/Text";
import { Table2 } from "@/components/ui/Table2";
import { ITableDetail, ITableHeader } from "@/interfaces/table";

import styles from "./Detail.module.scss";
import { tableHeIntegral, tableHeHogarMacotas, tableHeOut } from "./data";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/format";

interface DetailCoverageProps {
  product: {
    id: string;
    name: string;
    basePrice: number;
    price: number;
    beneficiaryPrice: number;
    description: string;
    assistances: IAssistance[];
  };
}

interface IAssistance {
  id: string;
  section: string;
  name: string;
  maximum: string;
  amount: number;
  currency: string;
  events: number;
  lack: number;
  selected: boolean;
}

interface ISection {
  title: string;
  data: ITableDetail[];
}

interface IDataTableInfo {
  [key: string]: {
    headers: ITableHeader[];
    data: ISection[];
  };
}

interface ICurrency {
  [key: string]: string;
}

const DetailCoverage = ({ product }: DetailCoverageProps) => {
  const router = useRouter();
  const { prod } = router.query;

  const dataCurrency: ICurrency = {
    P: "Pesos",
    U: "UF",
    O: "",
  };

  const groupedBySection = product.assistances.reduce((acc, assistance) => {
    if (!acc[assistance.section]) {
      acc[assistance.section] = [];
    }
    acc[assistance.section].push(assistance);
    return acc;
  }, {} as Record<string, IAssistance[]>);

  const tableDetailIntegral: ISection[] = Object.keys(groupedBySection).map(
    (section) => ({
      title: section,
      data: groupedBySection[section].map((item, key) => ({
        rowData: [
          <p className={styles.text}>{item?.name}</p>,
          <p className={styles.titleContainer}>
            <span className={styles.titleRed}>
              {item.maximum.trim().split(/\s+/)[0]}
            </span>
            {item.maximum.trim().split(/\s+/)[1]}
            {`${
              item.amount === 0
                ? ""
                : `
          hasta ${item.amount} 
          ${dataCurrency[item.currency]}
          `
            }`}
          </p>,

          item.events === 1 ? (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span> evento
            </p>
          ) : (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span> eventos
            </p>
          ),
          <p className={styles.titleContainer}>
            <span className={styles.titleRed}>{item.lack}</span> dias
          </p>,
        ],
      })),
    })
  );

  const tableDetailMascotas: ISection[] = Object.keys(groupedBySection).map(
    (section) => ({
      title: section,
      data: groupedBySection[section].map((item, key) => ({
        rowData: [
          <p className={styles.text}>{item?.name}</p>,

          item.maximum.trim().split(/\s+/)[0] === "50%" ? (
            <p className={styles.titleContainer}>{item.maximum}</p>
          ) : (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>
                {item.maximum.trim().split(/\s+/)[0]}
              </span>
            </p>
          ),

          <p className={styles.titleContainer}>
            {item.currency === "U"
              ? ` ${item.amount} ${dataCurrency[item.currency]}`
              : formatPrice(item.amount.toString())}
          </p>,
          item.events === 1 ? (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span> evento
            </p>
          ) : (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span> eventos
            </p>
          ),
        ],
      })),
    })
  );

  const tableDetailHogar: ISection[] = Object.keys(groupedBySection).map(
    (section) => ({
      title: section,
      data: groupedBySection[section].map((item, key) => ({
        rowData: [
          <p className={styles.text}>{item?.name}</p>,

          <p className={styles.titleContainer}>
            <span className={styles.titleRed}>
              {item.maximum.trim().split(/\s+/)[0]}
            </span>
          </p>,
          <p className={styles.titleContainer}>
            {formatPrice(item.amount.toString())}
          </p>,
          item.events === 1 ? (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span> evento
            </p>
          ) : (
            <p className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span> eventos
            </p>
          ),
        ],
      })),
    })
  );

  const dataTableInfo: IDataTableInfo = {
    integralPro: { headers: tableHeIntegral, data: tableDetailIntegral },
    mascotaPro: { headers: tableHeHogarMacotas, data: tableDetailMascotas },
    hogarPro: { headers: tableHeHogarMacotas, data: tableDetailHogar },
  };

  return (
    <ContentCol width="1200px" gap="0px">
      <Table2
        header={dataTableInfo[prod as string].headers}
        detail={[]}
        heightHead="50px"
      />

      {dataTableInfo[prod as string].data.map((item, key) => (
        <>
          {item.title && (
            <h1 className={styles.title} key={key}>
              {item.title}
            </h1>
          )}
          <Table2 header={tableHeOut} detail={item.data} />
        </>
      ))}

      {(product.id === "integralPro" || product.id === "mascotaPro") && (
        <ContentRow width="100%" justifyContent="flex-start" paddingTop="20px">
          <Text
            text="Carencia de 15 días"
            fontFamily="Inter"
            fontSize="24px"
            fontWeight={400}
            color="#03495C"
          />
        </ContentRow>
      )}
    </ContentCol>
  );
};

export default DetailCoverage;
