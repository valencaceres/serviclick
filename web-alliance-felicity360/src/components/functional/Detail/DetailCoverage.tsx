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

interface AssistanceItem {
  name: string;
  maximum: string;
  amount: number;
  events: number;
  lack: number;
  currency: string;
}

const DetailCoverage = ({ product }: DetailCoverageProps) => {
  const router = useRouter();
  const { id } = router.query;
  const dataCurrency: ICurrency = {
    P: "Pesos",
    U: "UF",
    O: "",
  };

/*   const groupedBySection = product.reduce((acc, assistance) => {
    if (!acc[assistance.section]) {
      acc[assistance.section] = [];
    }
    acc[assistance.section].push(assistance);
    return acc;
  }, {} as Record<string, IAssistance[]>); */

const urgentNames = [
  "Urgencia Médica por enfermedad",
  "Urgencia Médica por accidente",
  "Parto Normal",
  "Parto Cesárea",
  "Orientación Médica Telefónica",
  "Orientación Maternal Telefónica"
];

const ambulatoryNames = [
  "Consulta Médica General",
  "Consulta Médica Especialista",
  "Consulta Médica Psicológica",
  "Examen Médico",
  "Examen Preventivo Oncológico",
  "Telemedicina",
  "Telemedicina Especialista"
];

const assistanceArray: IAssistance[] = Object.values(product).flat().filter(
  (item): item is IAssistance => typeof item === 'object' && item !== null
);

const groupedBySection = assistanceArray.reduce((acc, assistance) => {
  if (!acc[assistance.section]) {
    acc[assistance.section] = [];
  }
  acc[assistance.section].push(assistance);
  return acc;
}, {} as Record<string, IAssistance[]>);

const tableDetailIntegral: ISection[] = Object.keys(groupedBySection).map(
  (section) => ({
    title: section,
    data: groupedBySection[section].map((item: any, key: number) => ({
      rowData: [
<React.Fragment key={item.id}>
    <p className={styles.text}>{item?.assistance_name}</p>
    <p className={styles.titleContainer}>
      <span className={styles.titleRed}>
        {item.maximum.trim().split(/\s+/)[0]}
      </span>
      {item.maximum.trim().split(/\s+/)[1]}
      {`${
        item.amount === 0
          ? ""
          : `hasta ${formatPrice(item.amount.toString())} 
             ${dataCurrency[item.currency]}`
      }`}
    </p>
    {item.events === 1 ? (
      <p className={styles.titleContainer}>
        <span className={styles.titleRed}>{item.events}</span> Evento
      </p>
    ) : (
      <p className={styles.titleContainer}>
        <span className={styles.titleRed}>{item.events}</span> Eventos
      </p>
    )}
    <p className={styles.titleContainer}>
      <span className={styles.titleRed}>{item.lack}</span> Días
    </p>
  </React.Fragment>,
      ],
    })),
  })
);

  const dataTableInfo: IDataTableInfo = {
    "b68288ec-b894-4c33-a2fd-20216973308a": { headers: tableHeIntegral, data: tableDetailIntegral },
    "3f6c8348-f939-4b77-911a-e02eedab9f1f": { headers: tableHeIntegral, data: tableDetailIntegral },
    "48dde8a3-674f-4c08-8f85-5f49d912b446": { headers: tableHeIntegral, data: tableDetailIntegral },
  };
  return (
    <ContentCol width="1200px" gap="0px">
      <Table2
    header={dataTableInfo[id as string]?.headers}
    detail={[]}
    heightHead="34px"/>

  {dataTableInfo[id as string]?.data.map((item, key) => (
      <React.Fragment key={key}>
        {item.title && (
          <h1 className={styles.title}>
            {item.title}
          </h1>
        )}
        <Table2 header={tableHeOut} detail={item.data} />
      </React.Fragment>
    ))}
      {(product.id === "b68288ec-b894-4c33-a2fd-20216973308a" || product.id === "3f6c8348-f939-4b77-911a-e02eedab9f1f") && (
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
