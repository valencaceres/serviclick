import Head from "next/head";

import styles from "../styles/integralPro.module.scss"

import { TableHeader, TableCell, TableTitle } from '@/components/ui/Table/Table'
import Text from '@/components/ui/Text/Text'
import Button from '@/components/ui/Button/Button'
import Benefit from '@/components/ui/Benefit/Benefit'
import Discount from '@/components/ui/Discount/Discount'
import Price from '@/components/ui/Price/Price'
import Beneficiary from '@/components/ui/Beneficiary/Beneficiary'


const integralPro = () => {
    return (
        <>
            <Head>
                <title>Asistencia Integral Pro</title>
                <meta name="description" content="Asistencia Integral Pro" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/hero/icono.png" />
            </Head>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.border}></div>
                    <h2> Asistencia Integral Pro</h2>
                    <p>$14.990</p>
                    <Price text='$12.950' />
                    <Discount text='20%' />
                    <Beneficiary text='$3.590  (cada carga)' />
                </div>
                <div className={styles.images}>
                    <Benefit textTwo='URGENCIA DENTAL' img='/img/integralPro/dental.png' />
                    <Benefit textTwo='ATENCIÓN DE URGENCIA ' img='/img/integralPro/urgencia.png' />
                    <Benefit textTwo='CONSULTA CON ESPECIALISTA' img='/img/integralPro/consulta.png' />
                    <Benefit textTwo='PREVENTIVO ONCOLÓGICO' img='/img/integralPro/preven.png' />
                    <Benefit textTwo='PARTO NORMAL O CESÁREA' img='/img/integralPro/parto.png' />
                    <Benefit textTwo='ATENCIÓN PSICOLÓGICA' img='/img/integralPro/psico.png' />
                </div>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <TableHeader text='SERVICIO' />
                        <TableHeader text='LÍMITE' />
                        <TableHeader text='MAX. EVENTOS AL AÑO' />
                        <TableHeader text='CARENCIA' />
                    </div>
                    <div className={styles.tableTitle}>
                        <TableTitle text='Urgencia dental' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Urgencia Dental' alignLeft={true} />
                        <TableCell textSpan='60%' text='Arancel hasta 5 UF ' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Exodoncia Simple' alignLeft={true} />
                        <TableCell textSpan='60%' text='Arancel hasta 2 UF ' />
                        <TableCell textSpan='2' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Exodoncia Colgajo' alignLeft={true} />
                        <TableCell textSpan='60%' text='Arancel hasta 2 UF ' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Radiografía Panorámica' alignLeft={true} />
                        <TableCell textSpan='100%' text='Arancel hasta 2 UF ' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Limpieza Dental' alignLeft={true} />
                        <TableCell textSpan='100%' text='Arancel hasta 2 UF ' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableTitle}>
                        <TableTitle text='Urgencia' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Urgencia Médica por Enfermedad' alignLeft={true} />
                        <TableCell textSpan='100%' text='Arancel hasta 9 UF' />
                        <TableCell textSpan='5' text='Eventos' />
                        <TableCell textSpan='10' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Urgencia  Médica por  Accidente' alignLeft={true} />
                        <TableCell textSpan='100%' text='Arancel hasta 9 UF ' />
                        <TableCell textSpan='24' text='Eventos' />
                        <TableCell textSpan='10' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Parto Normal' alignLeft={true} />
                        <TableCell textSpan='40%' text='Arancel hasta 8 UF ' />
                        <TableCell textSpan='1' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Parto Cesárea' alignLeft={true} />
                        <TableCell textSpan='40%' text='Arancel hasta 8 UF ' />
                        <TableCell textSpan='1' text='Eventos' />
                        <TableCell textSpan='45' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Orientación Médica Telefónica' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='100' text='Eventos' />
                        <TableCell textSpan='0' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Orientación Maternal Telefónica' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='100' text='Eventos' />
                        <TableCell textSpan='0' text='Días' />
                    </div>
                    <div className={styles.tableTitle}>
                        <TableTitle text='Ambulatoria' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Consulta Médica General' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='5' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Consulta Médica Especialista' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Consulta Médica Psicológica' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Examen Médico' alignLeft={true} />
                        <TableCell textSpan='100%' text='Arancel hasta 2 UF ' />
                        <TableCell textSpan='3' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Examen Preventivo Oncológico' alignLeft={true} />
                        <TableCell textSpan='100%' text='Arancel hasta 2 UF ' />
                        <TableCell textSpan='1' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Telemedicina ' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='5' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Telemedicina Especialista ' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell textSpan='5' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Descuento en Farmacias' alignLeft={true} />
                        <TableCell textSpan='50%' text='de la boleta hasta $10.000' />
                        <TableCell textSpan='12' text='Eventos' />
                        <TableCell textSpan='15' text='Días' />
                    </div>

                    <div className={styles.text}>
                        <p>• Carencia de 15 días</p>
                    </div>
                </div>
                <Button text='¡LO QUIERO!' link='' />
                <Text />
            </div>
        </>
    )
}

export default integralPro