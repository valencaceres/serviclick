import Head from "next/head";

import styles from "../styles/DetailPage.module.scss";

import {
  TableHeader,
  TableCell,
  TableTitle,
} from "@/components/ui/Table/Table";
import Text from "@/components/ui/Text/Text";
import Button from "@/components/ui/Button/Button";
import Assistance from "@/components/ui/Assistance/Assistance";
import Discount from "@/components/ui/Discount/Discount";
import Price from "@/components/ui/Price/Price";
import Beneficiary from "@/components/ui/Beneficiary/Beneficiary";
import { ContentCol, ContentRow } from "@/components/layout/Content";

const DetailPage = () => {
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

  return (
    <>
      <Head>
        <title>Asistencia Integral Pro</title>
        <meta name="description" content="Asistencia Integral Pro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/hero/icono.png" />
      </Head>
      <div
        style={{ height: "100px", backgroundColor: "#29abe2", width: "100%" }}
      ></div>
      <ContentCol paddingTop="20px" gap="30px">
        <ContentRow gap="20px">
          <div className={styles.border}></div>
          <h2> Asistencia Integral Pro</h2>
          <p>$14.990</p>
          <Price text="$12.950" />
          <Discount text="20%" />
          <Beneficiary text="$3.590  (cada carga)" />
        </ContentRow>
        <ContentRow width="1200px">
          <Assistance text="URGENCIA DENTAL" img="/img/Assistance/dental.png" />
          <Assistance
            text="ATENCIÓN DE URGENCIA "
            img="/img/Assistance/urgencia.png"
          />
          <Assistance
            text="CONSULTA CON ESPECIALISTA"
            img="/img/Assistance/consulta.png"
          />
          <Assistance
            text="PREVENTIVO ONCOLÓGICO"
            img="/img/Assistance/preven.png"
          />
          <Assistance
            text="PARTO NORMAL O CESÁREA"
            img="/img/Assistance/parto.png"
          />
          <Assistance
            text="ATENCIÓN PSICOLÓGICA"
            img="/img/Assistance/psico.png"
          />
        </ContentRow>

        <ContentCol width="1200px">
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

          <ContentRow width="100%" justifyContent="flex-start">
            <p>• Carencia de 15 días</p>
          </ContentRow>
        </ContentCol>
        <Button text="¡LO QUIERO!" link="" />
        <Text />
      </ContentCol>
    </>
  );
};

export default DetailPage;
