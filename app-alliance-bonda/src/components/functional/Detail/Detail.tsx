import React from "react";

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
import { assistanceData } from "@/data/assistance";
import Text from "@/components/ui/Text";

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
  return (
    <>
      <div
        style={{ height: "140px", backgroundColor: "#29abe2", width: "100%" }}
      ></div>
      <ContentCol paddingTop="20px" gap="30px" paddingBottom="90px">
        <ContentRow gap="20px" alignItems="center">
          <div className={styles.border}></div>
          <Text
            text="Asistencia Integral Pro"
            fontFamily="Inter"
            fontSize="32px"
            fontWeight={700}
            color="#03495c"
          />
          <Text
            text="$14.990"
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
          {assistanceData.map((assistance, index) => (
            <Assistance
              key={index}
              text={assistance.text}
              img={assistance.image}
            />
          ))}
        </ContentRow>

        <ContentCol width="1200px" gap="5px">
          <ContentRow width="100%">
            {tableHeader.map((title, index) => (
              <TableHeader key={index} {...title} />
            ))}
          </ContentRow>

          <ContentRow width="100%">
            <TableTitle text="Urgencia dental" />
          </ContentRow>

          <ContentRow width="100%">
            <TableCell text="Urgencia Dental" alignLeft={true} />
            <TableCell textSpan="60%" text="Arancel hasta 5 UF " />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Exodoncia Simple" alignLeft={true} />
            <TableCell textSpan="60%" text="Arancel hasta 2 UF " />
            <TableCell textSpan="2" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Exodoncia Colgajo" alignLeft={true} />
            <TableCell textSpan="60%" text="Arancel hasta 2 UF " />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Radiografía Panorámica" alignLeft={true} />
            <TableCell textSpan="100%" text="Arancel hasta 2 UF " />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Limpieza Dental" alignLeft={true} />
            <TableCell textSpan="100%" text="Arancel hasta 2 UF " />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableTitle text="Urgencia" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Urgencia Médica por Enfermedad" alignLeft={true} />
            <TableCell textSpan="100%" text="Arancel hasta 9 UF" />
            <TableCell textSpan="5" text="Eventos" />
            <TableCell textSpan="10" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell
              text="Urgencia  Médica por  Accidente"
              alignLeft={true}
            />
            <TableCell textSpan="100%" text="Arancel hasta 9 UF " />
            <TableCell textSpan="24" text="Eventos" />
            <TableCell textSpan="10" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Parto Normal" alignLeft={true} />
            <TableCell textSpan="40%" text="Arancel hasta 8 UF " />
            <TableCell textSpan="1" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Parto Cesárea" alignLeft={true} />
            <TableCell textSpan="40%" text="Arancel hasta 8 UF " />
            <TableCell textSpan="1" text="Eventos" />
            <TableCell textSpan="45" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Orientación Médica Telefónica" alignLeft={true} />
            <TableCell textSpan="100%" />
            <TableCell textSpan="100" text="Eventos" />
            <TableCell textSpan="0" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell
              text="Orientación Maternal Telefónica"
              alignLeft={true}
            />
            <TableCell textSpan="100%" />
            <TableCell textSpan="100" text="Eventos" />
            <TableCell textSpan="0" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableTitle text="Ambulatoria" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Consulta Médica General" alignLeft={true} />
            <TableCell textSpan="100%" />
            <TableCell textSpan="5" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Consulta Médica Especialista" alignLeft={true} />
            <TableCell textSpan="100%" />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Consulta Médica Psicológica" alignLeft={true} />
            <TableCell textSpan="100%" />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Examen Médico" alignLeft={true} />
            <TableCell textSpan="100%" text="Arancel hasta 2 UF " />
            <TableCell textSpan="3" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Examen Preventivo Oncológico" alignLeft={true} />
            <TableCell textSpan="100%" text="Arancel hasta 2 UF " />
            <TableCell textSpan="1" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Telemedicina " alignLeft={true} />
            <TableCell textSpan="100%" />
            <TableCell textSpan="5" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Telemedicina Especialista " alignLeft={true} />
            <TableCell textSpan="100%" />
            <TableCell textSpan="5" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
          </ContentRow>
          <ContentRow width="100%">
            <TableCell text="Descuento en Farmacias" alignLeft={true} />
            <TableCell textSpan="50%" text="de la boleta hasta $10.000" />
            <TableCell textSpan="12" text="Eventos" />
            <TableCell textSpan="15" text="Días" />
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
    </>
  );
};

export default Detail;
