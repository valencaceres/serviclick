import Head from "next/head";

import styles from "../styles/mascotaPro.module.scss"

import { TableHeader, TableCell, TableTitle } from '@/components/ui/Table/Table'
import Button from '@/components/ui/Button/Button'
import Benefit from '@/components/ui/Benefit/Benefit'
import Discount from '@/components/ui/Discount/Discount'
import Price from '@/components/ui/Price/Price'


const mascotaPro = () => {
    return (
        <>
            <Head>
                <title>Asistencia Mascota Pro</title>
                <meta name="description" content="Asistencia Mascota Pro" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/hero/icono.png" />
            </Head>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.border}></div>
                    <h2>Asistencia Mascota Pro </h2>
                    <p>$8.590</p>
                    <Price text='$6.870' />
                    <Discount text='20%' />
                </div>
                <div className={styles.images}>
                    <Benefit textTwo='URGENCIA VETERINARIA ' img='/img/mascotaPro/urgencia.png' />
                    <Benefit textTwo='CONSULTA MÉDICA VETERINARIA' img='/img/mascotaPro/consulta.png' />
                    <Benefit textTwo='DESCUENTO EN FARMACIAS' img='/img/mascotaPro/descuento.png' />
                    <Benefit textTwo='TELEMEDICINA VETERINARIA' img='/img/mascotaPro/tele.png' />
                    <Benefit textTwo='VACUNA ANTIRRÁBICA' img='/img/mascotaPro/vacuna.png' />
                    <Benefit textTwo='ASISTENCIA LEGAL TELEFÓNICA' img='/img/mascotaPro/asistencia.png' />
                </div>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <TableHeader text='SERVICIO' />
                        <TableHeader text='PROTECCIÓN' />
                        <TableHeader text='LÍMITE DE SERVICIO' />
                        <TableHeader text='MÁX. EVENTOS AL AÑO' />
                    </div>

                    <div className={styles.tableCell}>
                        <TableCell text='Urgencia Médica Veterinaria' alignLeft={true} />
                        <TableCell textSpan='80%' text='Arancel' />
                        <TableCell text='$300.000' />
                        <TableCell textSpan='3' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text=' Consulta Médica Veterinaria' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$90.000' />
                        <TableCell textSpan='2' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Descuento en Farmacias' alignLeft={true} />
                        <TableCell text='50% DE LA BOLETA' />
                        <TableCell text='$10.000' />
                        <TableCell textSpan='12' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Telemedicina Veterinaria' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='2UF' />
                        <TableCell textSpan='6' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Vacuna Antirrábica' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$15.000' />
                        <TableCell textSpan='1' text='Evento' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Asistencia Legal Telefónica' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='2 UF' />
                        <TableCell textSpan='4' text='Eventos' />
                    </div>

                    <div className={styles.text}>
                        <p>• Carencia de 15 días</p>
                    </div>
                </div>
                <Button text='¡LO QUIERO!' link='' />
            </div>
        </>
    )
}

export default mascotaPro