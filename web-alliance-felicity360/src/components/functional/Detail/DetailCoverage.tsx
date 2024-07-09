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

  const groupedBySection = product.assistances.reduce((acc, assistance) => {
    if (!acc[assistance.section]) {
      acc[assistance.section] = [];
    }
    acc[assistance.section].push(assistance);
    return acc;
  }, {} as Record<string, IAssistance[]>);

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

const groupedByCorrectSection: Record<string, AssistanceItem[]> = Object.entries(groupedBySection).reduce((acc: Record<string, AssistanceItem[]>, [sectionKey, assistances]) => {
  (assistances as AssistanceItem[]).forEach((item) => {
    let sectionTitle = sectionKey; // Mantener la sección original por defecto
    if (urgentNames.includes(item.name)) {
      sectionTitle = 'Urgencia';
    } else if (ambulatoryNames.includes(item.name)) {
      sectionTitle = 'Ambulatoria';
    }

    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push(item);
  });
  return acc;
}, {} as Record<string, AssistanceItem[]>);

const tableDetailIntegral: ISection[] = Object.entries(groupedByCorrectSection).map(
  ([section, assistances]) => {
    return {
      title: section,
      data: assistances.map((item, key) => ({
        rowData: [
          <p className={styles.text} key={key + '-name'}>{item?.name}</p>,
          <p className={styles.titleContainer} key={key + '-maximum'}>
            <span className={styles.titleRed}>
              {item.maximum.trim().split(/\s+/)[0]}
            </span>
            {item.maximum.trim().split(/\s+/)[1]}
            {`${
              item.amount.toString() === '0'
                ? ""
                : ` hasta ${formatPrice(item.amount.toString())} ${dataCurrency[item.currency]}`
            }`}
          </p>,
          <p className={styles.titleContainer} key={key + '-events'}>
            <span className={styles.titleRed}>{item.events}</span> {item.events === 1 ? 'Evento' : 'Eventos'}
          </p>,
          <p className={styles.titleContainer} key={key + '-lack'}>
            <span className={styles.titleRed}>{item.lack}</span> Días
          </p>
        ],
      }))
    };
  }
);

  const dataTableInfo: IDataTableInfo = {
    "08ce5e35-2214-418a-b59c-f012524f09ad": { headers: tableHeIntegral, data: tableDetailIntegral },
    "baa2d44d-0685-449e-ae27-c380561c7c18": { headers: tableHeIntegral, data: tableDetailIntegral },
    "de2af317-4920-469c-a706-482581596f5d": { headers: tableHeIntegral, data: tableDetailIntegral },
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

      {(product.id === "08ce5e35-2214-418a-b59c-f012524f09ad" || product.id === "baa2d44d-0685-449e-ae27-c380561c7c18") && (
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
