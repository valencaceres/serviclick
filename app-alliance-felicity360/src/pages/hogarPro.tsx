import Head from "next/head";

import styles from "../styles/hogarPro.module.scss"

import { TableHeader, TableCell, TableTitle } from '@/components/ui/Table/Table'
import Button from '@/components/ui/Button/Button'
import Benefit from '@/components/ui/Benefit/Benefit'
import Discount from '@/components/ui/Discount/Discount'
import Price from '@/components/ui/Price/Price'


const hogarPro = () => {
    return (
        <>
            <Head>
                <title>Asistencia Hogar Pro</title>
                <meta name="description" content="Asistencia Hogar Pro" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/hero/icono.png" />
            </Head>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.border}></div>
                    <h2>Asistencia Hogar Pro</h2>
                    <p>$9.490</p>
                    <Price text='$7.590' />
                    <Discount text='20%' />
                </div>
                <div className={styles.images}>
                    <Benefit textTwo='ASISTENCIA PLOMERÍA' img='/img/hogarPro/plomeria.png' />
                    <Benefit textTwo='ASISTENCIA ELECTRICIDAD' img='/img/hogarPro/electricidad.png' />
                    <Benefit textTwo='ASISTENCIA CERRAJERÍA  ' img='/img/hogarPro/cerrajeria.png' />
                    <Benefit textTwo='ASISTENCIA VIDRIERÍA' img='/img/hogarPro/vidrieria.png' />
                    <Benefit textTwo='INSTALACIÓN DE LUMINARIAS Y/O LÁMPARAS' img='/img/hogarPro/luminaria.png' />
                </div>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <TableHeader text='SERVICIO' />
                        <TableHeader text='PROTECCIÓN' />
                        <TableHeader text='LÍMITE DE SERVICIO' />
                        <TableHeader text='MÁX. EVENTOS AL AÑO' />
                    </div>

                    <div className={styles.tableCell}>
                        <TableCell text='Asistencia Plomería ' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$60.000' />
                        <TableCell textSpan='3' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Asistencia Electricidad ' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$60.000' />
                        <TableCell textSpan='3' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Asistencia Cerrajería ' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$60.000' />
                        <TableCell textSpan='3' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Asistencia Vidriería' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$60.000' />
                        <TableCell textSpan='3' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Instalación de Luminarias ' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$30.000' />
                        <TableCell textSpan='2' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Instalación de Cortinas' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$60.000' />
                        <TableCell textSpan='3' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Perforaciones en Muro' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$200.000' />
                        <TableCell textSpan='12' text='Eventos' />
                    </div>
                    <div className={styles.tableCell}>
                        <TableCell text='Pintura Baño y Cocina' alignLeft={true} />
                        <TableCell textSpan='100%' />
                        <TableCell text='$150.000' />
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

export default hogarPro