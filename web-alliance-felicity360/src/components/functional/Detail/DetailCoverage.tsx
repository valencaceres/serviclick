import React, {useState, useEffect} from "react";

import { ContentCol, ContentRow } from "@/components/layout/Content";

import { Table2 } from "@/components/ui/Table2";
import { ITableDetail, ITableHeader } from "@/interfaces/table";

import styles from "./Detail.module.scss";
import { tableHeIntegral, tableHeOut } from "./data";
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

interface AssistanceItem {
  name: string;
  maximum: string;
  amount: number;
  events: number;
  lack: number;
  currency: string;
}

const DetailCoverage = ({ product }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const dataCurrency: ICurrency = {
    P: "Pesos",
    U: "UF",
    O: "",
  };

  const groupedBySection = product.reduce((acc: any, assistance: any) => {
    if (!acc[assistance.section]) {
      acc[assistance.section] = [];
    }
    acc[assistance.section].push(assistance);
    return acc;
  }, {} as Record<string, IAssistance[]>);

  const amountFormat = (item: AssistanceItem) => {
    return item.amount > 0
      ? ` hasta ${item.currency === "P" ? "$" : ""}${formatPrice(
          item.amount.toString()
        )} ${item.currency === "U" ? dataCurrency[item.currency] : ""}`
      : "";
  };

  const tableDetailIntegral: ISection[] = Object.keys(groupedBySection).map(
    (section) => ({
      title: section,
      data: groupedBySection[section].map((item: any, key: number) => ({
        rowData: [
          <div className={styles.container} key={item.id}>
            <p className={styles.text}>{item?.assistance_name}</p>
            <div className={styles.titleContainer}>
              <span className={styles.titleRed}>
                {item.maximum.trim().split(/\s+/)[0]}
              </span>
              {item.maximum.trim().split(/\s+/)[1]}
              {amountFormat(item)}
            </div>
            <div className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.events}</span>
              {item.events === 1 ? " Evento" : " Eventos"}
            </div>
            <div className={styles.titleContainer}>
              <span className={styles.titleRed}>{item.lack}</span> Días
            </div>
          </div>,
        ],
      })),
    })
  );

  const [header, setHeader] = useState<ITableHeader[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setHeader(tableHeIntegral);
      } else {
        setHeader([{ text: "Asistencias", align: "left", type: "string", width: "100%" }]);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <ContentCol width="100%" gap="0px">
      <Table2 header={header} detail={[]} heightHead="34px" />
      {tableDetailIntegral.map((item, key) => (
        <React.Fragment key={key}>
          <Table2 header={tableHeOut} detail={item.data} />
        </React.Fragment>
      ))}
    </ContentCol>
  );
};

export default DetailCoverage;
